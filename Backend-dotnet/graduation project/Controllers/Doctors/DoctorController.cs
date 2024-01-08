using graduationProject.DAL;
using GraduationProject.BL;
using GraduationProject.BL.Dtos;
using GraduationProject.BL.Dtos.Doctor;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace graduation_project.Controllers.Doctors
{
    [ApiController]

    [Route("api/[controller]")]
    public class DoctorController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IDoctorManager _doctorManager;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;


        public DoctorController(IConfiguration configuration,
            UserManager<IdentityUser> userManager, IDoctorManager doctorManager, IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor)
        {
            _configuration = configuration;
            _userManager = userManager;
            _doctorManager = doctorManager;
            _webHostEnvironment = webHostEnvironment;
            _httpContextAccessor = httpContextAccessor;
        }

        #region GetAllSpcializations
        [HttpGet]
        [Route("GetAllSpecialization")]
        public ActionResult<List<GetAllSpecializationsDto>?> GetAllSpecialization()
        {
            List<GetAllSpecializationsDto>? getAllSpecializationsDtos = _doctorManager.GetAllSpecializations();
            if (getAllSpecializationsDtos == null) {return NotFound();}
            return getAllSpecializationsDtos;
        }
        #endregion
        #region GetAllDoctors
        [HttpGet]
        public ActionResult<List<GetAllDoctorsDto>?> GetAllDoctors()
        {
            List<GetAllDoctorsDto>? getAllDoctorsDto = _doctorManager.GetAllDoctors();

            if (getAllDoctorsDto == null) { return NotFound(); }

            var baseUrl = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host.Value}";
            baseUrl = baseUrl.TrimEnd('/');

            foreach (var doctor in getAllDoctorsDto)
            {
                doctor.ImageUrl = $"{baseUrl}/{doctor.ImageStoredFileName}";
                doctor.ImageUrl = doctor.ImageUrl.Replace("wwwroot/", string.Empty);

            }

            return getAllDoctorsDto;
        }

        #endregion
        #region GetDoctorById
        [HttpGet]
        [Route("doctors/{DoctorId}")]
        public ActionResult<GetDoctorByIDDto> GetDoctorById(string DoctorId)
        {
            GetDoctorByIDDto? GetDoctorById = _doctorManager.GetDoctorBYId(DoctorId);
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


        #region GetDoctorByPhone
        [HttpGet]
        [Route("doctor/{phoneNumber}")]
        public ActionResult<GetDoctorByPhoneDto> GetAdminByPhone(string phoneNumber)
        {
            GetDoctorByPhoneDto? doctor = _doctorManager.getDoctorByPhoneDTO(phoneNumber);
            if (doctor == null) { return NotFound(); }
            var baseUrl = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host.Value}";

            baseUrl = baseUrl.TrimEnd('/');

            var imageUrl = $"{baseUrl}/{doctor.ImageStoredFileName}";
            // Remove the wwwroot part from the URL
            imageUrl = imageUrl.Replace("wwwroot/", string.Empty);



            doctor.ImageUrl = imageUrl;
            return Ok(doctor);
        }


        #endregion

        #region GetDoctorBySpecialization
        [HttpGet]
        [Route("doctors/specialization/{id}")]
        public ActionResult<List<GetDoctorsBySpecializationDto>> GetBySpecialization(int id)
        {
            List<GetDoctorsBySpecializationDto> DoctorWithSpecialization = _doctorManager.GetDoctorsBySpecialization(id);
            if (DoctorWithSpecialization is null)
                return NotFound("Doctors with specialization not found");
            var baseUrl = $"{_httpContextAccessor.HttpContext.Request.Scheme}://{_httpContextAccessor.HttpContext.Request.Host.Value}";
            baseUrl = baseUrl.TrimEnd('/');
            foreach (var doctor in DoctorWithSpecialization)
            {
                foreach (var d in doctor.ChildDoctorOfSpecializations)
                {
                    d.ImageUrl = $"{baseUrl}/{d.ImageStoredFileName}";
                    d.ImageUrl =d.ImageUrl.Replace("wwwroot/", string.Empty);
                }
            }
            return DoctorWithSpecialization;
        }
        #endregion
        #region doctor Login

        [HttpPost]
        [Route("Doctor/login")]

        //=> /api/users/static-login
        public async Task<ActionResult<TokenDto>> Login(LoginDto credentials )
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
                return Unauthorized("Invalid password");
            }
            
            #endregion

            #region Generate Token

            var claimsList = await _userManager.GetClaimsAsync(user);
            var roleClaim = claimsList.FirstOrDefault(c => c.Type == ClaimTypes.Role);
            
            if(roleClaim.Value != "Doctor")
            {
                return Unauthorized("You are not a doctor");
            }
            
            
            string secretKey = _configuration.GetValue<string>("SecretKey")!;
            var algorithm = SecurityAlgorithms.HmacSha256Signature;

            var keyInBytes = Encoding.ASCII.GetBytes(secretKey);
            var key = new SymmetricSecurityKey(keyInBytes);
            var signingCredentials = new SigningCredentials(key, algorithm);

            var token = new JwtSecurityToken(
                claims: claimsList,
                signingCredentials: signingCredentials,
                expires: DateTime.Now.AddMinutes(10));
            var tokenHandler = new JwtSecurityTokenHandler();

            return new TokenDto
            {
                Token = tokenHandler.WriteToken(token),
            };

            #endregion

        }
        #endregion
        #region doctor Register

        [HttpPost]
        [Route("Doctor/register")]
        public async Task<ActionResult> Register(RegisterDoctorDto registerDto)
        {
            var user = new Doctor
            {
                Name = registerDto.Name,
                PhoneNumber = registerDto.PhoneNumber,
                UserName = registerDto.PhoneNumber,
                DateOfBirth = registerDto.DateOfBirth,
                Title = registerDto.Title,
                Description = registerDto.Description,
                Salary = registerDto.Salary,
                AssistantID = registerDto.AssistantID,
                AssistantName = registerDto.AssistantName,
                AssistantPhoneNumber = registerDto.AssistantPhoneNumber,
                AssistantDateOfBirth = registerDto.AssistantDateOfBirth,
                SpecializationId = registerDto.SpecializationId,
                Status = false
            };
            var creationResult = await _userManager.CreateAsync(user, registerDto.Password);
            if (!creationResult.Succeeded)
            {
                return BadRequest(creationResult.Errors);
            }

            var claimsList = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Role, "Doctor"),
           // new Claim(ClaimTypes.Name, user.UserName)
        //    new Claim(ClaimTypes.MobilePhone, user.PhoneNumber)
        };
            await _userManager.AddClaimsAsync(user, claimsList);

            return Ok();
        }

        #endregion
        #region ReceptionLogin

        [HttpPost]
        [Route("reception/login")]
        //=> /api/users/static-login
        public async Task<ActionResult<TokenDto>> ReceptionLogin(LoginDto credentials)
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

            if (roleClaim.Value != "Reception")
            {
                return Unauthorized("You are not a Reception");
            }
            string secretKey = _configuration.GetValue<string>("SecretKey")!;
            var algorithm = SecurityAlgorithms.HmacSha256Signature;

            var keyInBytes = Encoding.ASCII.GetBytes(secretKey);
            var key = new SymmetricSecurityKey(keyInBytes);
            var signingCredentials = new SigningCredentials(key, algorithm);

            var token = new JwtSecurityToken(
                claims: claimsList,
                signingCredentials: signingCredentials,
                expires: DateTime.Now.AddMinutes(10));
            var tokenHandler = new JwtSecurityTokenHandler();

            return new TokenDto
            {
                Token = tokenHandler.WriteToken(token),
            };

            #endregion

        }

        #endregion
        #region ReceptionRegister

        [HttpPost]
        [Route("reception/register")]
        public async Task<ActionResult> ReceptionRegister(ReceptionRegisterDto registerDto)
        {
            var user = new Reception
            {

                Name = registerDto.Name,
                PhoneNumber = registerDto.PhoneNumber,
                UserName = registerDto.PhoneNumber,

            };
            var creationResult = await _userManager.CreateAsync(user, registerDto.Password);
            if (!creationResult.Succeeded)
            {
                return BadRequest(creationResult.Errors);
            }

            var claimsList = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Role, "Reception"),
        //    new Claim(ClaimTypes.Name, user.UserName)
        //    new Claim(ClaimTypes.MobilePhone, user.PhoneNumber)
        };
            await _userManager.AddClaimsAsync(user, claimsList);

            return Ok();
        }
        #endregion


        #region WeekSchedule
        [HttpGet]
        [Route("DoctorVisit/{id}")]
        public ActionResult<GetAllWeekScheduleDto> GetAllWeekScheduleByDoctorId(string? id)
        {
            GetAllWeekScheduleDto? weekschedule = _doctorManager.GetAllWeekScheduleByDoctorId(id);
            if(weekschedule == null) { return NotFound(); }
            return Ok(weekschedule);
        }

        #endregion


        #region GetPatientForDoctor
        [HttpGet]
        [Route("doctors/patients/{PatientId}")]
        public ActionResult<GetPatientForDoctorDto> GetPatientForDoctor(string PatientId)
        {
            GetPatientForDoctorDto? PatientForDoctor = _doctorManager.GetPatientForDoctorId(PatientId);
            if (PatientForDoctor == null)
                return NotFound("Patient not found");
            return PatientForDoctor;
        }


        #endregion


        #region GetAllPatientsWithDate
        [HttpGet]
        [Route("dailySchedule/{date}")]
        public List<GetAllPatientsWithDateDto> getAllPatientsWithDates(DateTime date , string DoctorId)
        {   
            var d = _doctorManager.GetAllPatientsWithDate(date, DoctorId);
            if(d == null)
            {
                return d;
            }
            return d;
        }

        #endregion
        #region Add Visit Count Records
        [HttpPost]
        [Route("addVisitCount/{Startdate}")]
        public ActionResult AddVisitCountRecords(DateTime Startdate, DateTime EndDate)
        {
            _doctorManager.AddVisitCountRecords(Startdate,EndDate);
            return StatusCode(StatusCodes.Status202Accepted);

        }
        #endregion
        #region get visit count
        [HttpGet]
        [Route("visitCount/{date}")]
        public ActionResult<VisitCountDto> GetVisitCount(DateTime date , string DoctorId)
        {
            VisitCountDto visitCount = _doctorManager.GetVisitCount(date, DoctorId);
            if(visitCount == null)
            {
                return NotFound();
            }
            return Ok(visitCount);
        }
        #endregion
        #region get visit count for week
        [HttpGet]
        [Route("visitCount/{date}/{date2}")]
        public ActionResult<List<VisitCountDto>> GetVisitCountForWeek(DateTime date, string DoctorId, DateTime date2)
        {
            List<VisitCountDto> visitCounts = new List<VisitCountDto>();
            for (int i = 0; i < 7; i++)
            {
               
                VisitCountDto visitCount = _doctorManager.GetVisitCount(date.AddDays(i), DoctorId);
                
            
            if (visitCount == null)
            {
                return NotFound();
            }
            else { visitCounts.Add(visitCount); }
            }
            return Ok(visitCounts);
        }
        #endregion
        #region UpdatePatientVisit
        [HttpPut]
        //[Authorize(Policy = "DoctorPolicy")]
        [Route("PatientVisit")]
        public ActionResult UpdatePatientVisit(UpdatePatientVisitDto updateDto)
        {
            bool result = _doctorManager.UpdatePatientVisit(updateDto);
            if (!result)
            {
                return Ok();
            }
            return StatusCode(StatusCodes.Status202Accepted);
        }
        #endregion
        #region getmutualvisits
        [HttpGet]
        [Route("mutualvisits")]
        public IActionResult GetMutualVisits(string patientPhone, string doctorPhone)
        {
            List<GetPatientVisitsChildDTO> mutualVisits = _doctorManager.GetMutualVisits(patientPhone, doctorPhone);

            if (mutualVisits.Count == 0)
            {
                return NoContent(); 
            }

            return Ok(mutualVisits);
        }




        #endregion
        #region UploadImages


        [HttpPost]
      //  [Authorize(Policy = "DoctorPolicy")]
        [Route("doctors/uploadimage/{doctorId}")]
        public async Task<IActionResult> UploadImage(string doctorId,List< IFormFile> imageFile)
        {
            try
            {
               List<Doctor> uploadedDoctor = await _doctorManager.UploadDoctorImage(doctorId, imageFile);
                if (uploadedDoctor != null)
                {
                    return Ok(uploadedDoctor);
                }
                else
                {
                    return BadRequest("No files provided or an error occurred during upload.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }



        }

        //#region UpdateImage
        //[HttpPut]
        //[Route("doctors/updateimage/{doctorId}")]
        //public IActionResult UpdateImage(string doctorId, IFormFile imageFile)
        //{
        //    try
        //    {
        //        if (string.IsNullOrEmpty(doctorId) || imageFile == null)
        //        {
        //            return BadRequest("Invalid input");
        //        }

        //        _doctorManager.UpdateDoctorImage(doctorId, imageFile.FileName, imageFile.FileName, imageFile.ContentType);

        //        return Ok("Doctor's image updated successfully");
        //    }
        //    catch (Exception ex)
        //    {
        //        return StatusCode(500, "Internal server error");
        //    }
        //}




        //#endregion

        //[HttpGet]
        //[Route("images/{fileName}")]
        //public IActionResult GetImage(string fileName)
        //{
        //    var imagePath = Path.Combine("UploadImages", fileName);
        //    var fullPath = Path.Combine(Directory.GetCurrentDirectory(), imagePath);

        //    if (!System.IO.File.Exists(fullPath))
        //    {
        //        return NotFound();
        //    }

        //    var fileBytes = System.IO.File.ReadAllBytes(fullPath);
        //    return File(fileBytes, "image/jpeg"); 
        //}



        #endregion
        #region UpdateMedicalHistory
        [HttpPut]
        [Route("MedicalHistory")]
        public ActionResult UpdateMedicalHistory(UpdateMedicalHistoryDto updateDto)
        {
            bool result = _doctorManager.UpdateMedicalHistory(updateDto);
            if (!result)
            {
                return NotFound();
            }
            return Ok();
        }
        #endregion
        # region AddMedicaHistory
        [HttpPost]
        [Route("MedicalHistory")]
        public ActionResult AddMedicaHistory(AddMedicalHistroyDto addMedicalHistroyDto)
        {
            _doctorManager.AddMedicaHistory(addMedicalHistroyDto);
            return Ok();
        }
   
        #endregion

    }

}