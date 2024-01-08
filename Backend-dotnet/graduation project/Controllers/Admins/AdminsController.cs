using graduationProject.DAL;
using graduationProject.DAL.Data.Models;
using GraduationProject.BL;
using GraduationProject.BL.Dtos;
using GraduationProject.BL.Dtos.Doctor;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace graduation_project.Controllers.Admins
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminsController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IAdminManager _adminManager;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;


        public AdminsController(IConfiguration configuration,
            UserManager<IdentityUser> userManager, IAdminManager adminManager, IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor)
        {
            _configuration = configuration;
            _userManager = userManager;
            _adminManager = adminManager;
            _webHostEnvironment = webHostEnvironment;
            _httpContextAccessor = httpContextAccessor;

        }
        #region Get Admin By Phone Number
        [HttpGet]
        [Route("Admin/{phoneNumber}")]
        public ActionResult<GetAdminByPhoneNumberDto> GetAdminByPhoneNumber(string phoneNumber)
        {
            GetAdminByPhoneNumberDto? Admin = _adminManager.GetAdminByPhoneNumber(phoneNumber);
            if(Admin == null) { return NotFound(); }
            var baseUrl = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host.Value}";

            baseUrl = baseUrl.TrimEnd('/');

            var imageUrl = $"{baseUrl}/{Admin.ImageStoredFileName}";
            imageUrl = imageUrl.Replace("wwwroot/", string.Empty);
            Admin.ImageUrl = imageUrl;


            return Admin;
        }
        #endregion
        #region get All specializations and doctors for admin
        [HttpGet]
        [Route("Specializations")]
        public ActionResult<List<GetAllSpecializationForAdminDto>> GetAllSpecializationForAdmins()
        {
            return _adminManager.GetAllSpecializations();
        }
        #endregion
        #region get week schedule record by id
        [HttpGet]
        [Route("weekScheduleRecord/{id}")]
        public ActionResult<WeekScheduleForDoctorsDto> GetWeekScheduleRecordById(int id)
        {
            return _adminManager.GetWeekScheduleById(id);
        }
        #endregion

        #region admin login
        [HttpPost]
        [Route("Admins/login")]
        //=> /api/users/static-login
        public async Task<ActionResult<TokenDto>> AdminLogin(LoginDto credentials)
        {
            #region Username and Password verification

            IdentityUser? user = await _userManager.FindByNameAsync(credentials.PhoneNumber);

            if (user is null)
            {
                return NotFound("User not found");
            }

            bool isPasswordCorrect = await _userManager.CheckPasswordAsync(user, credentials.Password);
            if (!isPasswordCorrect)
            {
                //  return Unauthorized();
                return Unauthorized("Invalid password");
            }

            #endregion

            #region Generate Token

            var claimsList = await _userManager.GetClaimsAsync(user);

            var roleClaim = claimsList.FirstOrDefault(c => c.Type == ClaimTypes.Role);

            if (roleClaim.Value != "Admin")
            {
                return Unauthorized("You are not an Admin");
            }

            string secretKey = _configuration.GetValue<string>("SecretKey")!;
            var algorithm = SecurityAlgorithms.HmacSha256Signature;

            var keyInBytes = Encoding.ASCII.GetBytes(secretKey);
            var key = new SymmetricSecurityKey(keyInBytes);
            var signingCredentials = new SigningCredentials(key, algorithm);

            var token = new JwtSecurityToken(
                claims: claimsList,
                signingCredentials: signingCredentials,
                expires: DateTime.Now.AddMinutes(720));
            var tokenHandler = new JwtSecurityTokenHandler();

            return new TokenDto
            {
                Token = tokenHandler.WriteToken(token),
            };

            #endregion

        }
        #endregion
        #region Update week schedule record With Id
        [HttpPut]
        [Route("admins/updateWeekSchedule/{id}")]
        public IActionResult UpdateWeekSchedule(WeekScheduleForDoctorsDto? week, int id)
        {
            WeekSchedule weekSchedule = _adminManager.UpdateWeekScheduleRecord(week,id);
            if (weekSchedule == null)
            {
                return NotFound();
            }
            return Ok();
        }
        #endregion
        #region admin register

        [HttpPost]
        [Route("Admins/register")]
        public async Task<ActionResult> AdminRegister(RegisterAdminDto registerDto)
        {
            var user = new Admin
            {

                Name = registerDto.Name,
                PhoneNumber = registerDto.PhoneNumber,
                UserName = registerDto.PhoneNumber,
                SpecializationId = registerDto.SpecializationId
            };
            var creationResult = await _userManager.CreateAsync(user, registerDto.Password);
            if (!creationResult.Succeeded)
            {
                return BadRequest(creationResult.Errors);
            }

            var claimsList = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Role, "Admin"),
            
        //    new Claim(ClaimTypes.MobilePhone, user.PhoneNumber)
        };
            await _userManager.AddClaimsAsync(user, claimsList);

            return Ok();
        }

        #endregion

        #region Update Doctor With Id
        [HttpPut]
        [Route("admins/updatedoctor/{doctorId}")]
        public IActionResult UpdateDoctorById(UpdateDoctorStatusDto updateDoctor , string doctorId)
        {
            Doctor? doctor = _adminManager.UpdateDoctorById(updateDoctor , doctorId);
            if (doctor == null)
            {
                return NotFound();
            }
            return Ok();
        }
        #endregion

        #region Update Admin with phone 
        [HttpPut]
        [Route("admins/updateAdmin/{phone}")]
        public IActionResult UpdateAdmin (UpdateAdminByPhoneDto updateAdmin , string phone) 
        {
            Admin? admin = _adminManager.UpdateAdminByPhone(updateAdmin , phone);
            if (admin == null) { return NotFound(); }
            return Ok();

        }
        #endregion
        #region GetDoctorById For Admin
        [HttpGet]
        [Route("admin/getDoctorForAdmin/{DoctorId}")]
        public ActionResult<GetDoctorByIDForAdminDto> GetDoctorById(string DoctorId)
        {
            GetDoctorByIDForAdminDto? GetDoctorById = _adminManager.GetDoctorByIdForAdmin(DoctorId);
            if (GetDoctorById == null)
                return NotFound("Doctor not found");

            var baseUrl = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host.Value}";

            baseUrl = baseUrl.TrimEnd('/');

            var imageUrl = $"{baseUrl}/{GetDoctorById.ImageStoredFileName}";
            // Remove the wwwroot part from the URL
            imageUrl = imageUrl.Replace("wwwroot/", string.Empty);



            GetDoctorById.ImageUrl = imageUrl;

            return GetDoctorById;
        }
        #endregion
        #region ChangeStatus
        [HttpPut("admins/changedoctorstatus/{doctorId}")]
        public IActionResult ChangeStatus(string doctorId)
        {
            Doctor? doctor = _adminManager.ChangeDoctorStatus(doctorId);

            if (doctor == null)
            {
                return NotFound("Doctor not found");
            }

            return NoContent(); 
        }

        #endregion
        #region AddSpecialization
        [HttpPost]
        [Route("Admins/AddSpecialization")]
        public IActionResult AddSpecialization(AddSpecializationDto addSpecializationDto)
        {
            _adminManager.AddSpecialization(addSpecializationDto);
            return StatusCode(StatusCodes.Status201Created);

        }

        #endregion

        #region update patient status
        [HttpPut]
        [Route("admins/updatePatientVisitStatus")]
        public ActionResult<GetAllPatientsWithDateDto> UpdatePatientVisit(UpdateArrivalPatientStatusDto updateArrivalPatientStatusDto)
        {
            GetAllPatientsWithDateDto patientVisit = _adminManager.UpdateArrivedPatientStatus(updateArrivalPatientStatusDto);
            if (patientVisit != null)
            {
                return patientVisit;
            }
            else
            {
                return NotFound(); 
            }
            
        }
        #endregion

        #region add week schedule
        [HttpPost]
        [Route("/addWeekSchedule")]
        public ActionResult AddWeekSchedule (AddWeekScheduleDto addWeekScheduleDto)
        {
            _adminManager.AddWeekSchedule(addWeekScheduleDto);
            return Ok();
        }
        #endregion





        #region Get Top Rated Doctors
        [HttpGet]
        [Route("AverageRateForDoctors")]
        public IActionResult GetAverageRateForEachDoctor()
        {
            //List<Doctor> allDrs = _adminManager.GetAverageRateForEachDoctor();
           return Ok(_adminManager.GetAverageRateForEachDoctor()) ;
        }
        #endregion

        #region Get Number Of Patient for a day
        [HttpGet]
        [Route("NumberOfPatientForADay")]
        public IActionResult  GetNumberOfPatientForADay(DateTime date)
        {
            int counter = _adminManager.GetNumberOfPatientsForADay(date);
            return Ok(counter);
        }
        #endregion

        #region Get Available Doctors For a Day
        [HttpGet]
        [Route("NumberOfAvailableDoctorsForADay")]
        public IActionResult GetNumberOfAvailableDoctorInADay(DateTime date)
        {
            int counter = _adminManager.GetNumberOfAvailableDoctorInADay(date);
            return Ok(counter);
        }
        #endregion

        #region Get Number of Doctors for a period
        [HttpGet]
        [Route("NumberOfDoctorsForAPeriod")]
        public IActionResult GetNumberOfPatientsForAPeriod(DateTime startDate, DateTime endDate)
        {
            int counter = _adminManager.GetNumberOfPatientsForAPeriod(startDate, endDate);
            return Ok(counter);
        }
        #endregion


        #region GetHighDemandSpecialization
        [HttpGet]
        [Route("PatientVisitsInAPeriodAndSpecialization")]
        public List<PatientVisit> GetPatientVisitsInAPeriodAndSpecialization(DateTime startDate, DateTime endDate, int specializationId)
        {
            return _adminManager.GetPatientVisitsInAPeriodAndSpecialization(startDate, endDate, specializationId);
        }
        #endregion

        #region PatientVisitsForDoctors
        [HttpGet]
        [Route("doctors-visits-number")]
        public ActionResult<List<GetDoctorsVisitsNumberDto>?> GetDoctorsVisitsNumber()
        {
            List<GetDoctorsVisitsNumberDto>? getVisitsNumberDto = _adminManager.GetDoctorsPatientVisitsNumber();

            if (getVisitsNumberDto == null) { return NotFound(); }

            return getVisitsNumberDto;
        }

        #endregion
        #region get reception by phone number
        [HttpGet]
        [Route("Reception/{PhoneNumber}")]
        public ActionResult<GetReceptionByPhoneNumberDto> GetReceptionByPhoneNumber(string PhoneNumber)
        {
            GetReceptionByPhoneNumberDto reception = _adminManager.GetReceptionByPhoneNumber(PhoneNumber);
            if (reception == null) { return NotFound(); }
            return reception!;
        }
        #endregion

        #region UploadImages

        [HttpPost]
        // [Authorize(Policy = "DoctorPolicy")]
        [Route("admins/uploadimage/{adminId}")]
        public async Task<IActionResult> UploadImage(string adminId, IFormFile imageFile)
        {
            try
            {
                Admin uploadedAdmin = await _adminManager.UploadAdminImage(adminId, imageFile);

                if (uploadedAdmin != null)
                {
                    return Ok(uploadedAdmin);
                }
                else
                {
                    return BadRequest("No file provided or an error occurred during upload.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        #endregion
        #region get rate and review by doctor id and date
        [HttpGet]
        [Route("RateAndReview/{id}")]
        public ActionResult<List<GetRateAndReviewDto>> GetRateAndReviewByDocIdAndDate(DateTime date , string id)
        {
            List<GetRateAndReviewDto> getRateAndReview = _adminManager.GetRateAndReviewByDocIdAndDate(date , id);
            if (getRateAndReview == null) { return NotFound(); }
            else { return Ok(getRateAndReview); };
        }
        #endregion


    }
}
