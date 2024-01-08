using graduationProject.DAL;
using graduationProject.DAL.Data.Models;
using GraduationProject.BL.Dtos;
using GraduationProject.BL.Dtos.Doctor;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace GraduationProject.BL
{
    public class DoctorManager : IDoctorManager
    {
        // private readonly PatientRepo _patientRepo;
        private readonly IUnitOfWork _unitOfWork;
        public DoctorManager(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public List<GetAllSpecializationsDto> GetAllSpecializations()
        {
            List<Specialization> specializations = _unitOfWork.doctorRepo.GetAllSpecializations();
            return specializations.Select(s => new GetAllSpecializationsDto
            {
                Id = s.Id,
                Name = s.Name,
                DoctorsForAllSpecializations = s.Doctors.Select(d => new DoctorsForAllSpecializations
                {
                    Id = d.Id,
                    Name = d.Name,
                    Status = d.Status,
                    WeekSchadual = d.weeks
                     .Select(d => new WeekScheduleForDoctorsDto
                     {
                         Id = d.Id,
                         DayOfWeek = d.DayOfWeek,
                         LimitOfPatients = d.LimitOfPatients,
                         StartTime = d.StartTime.ToShortTimeString(),
                         EndTime = d.EndTime.ToShortTimeString(),
                         IsAvailable = d.IsAvailable
                     }).ToList()
                }).ToList()
            }).ToList();
        }
        public List<GetAllDoctorsDto> GetAllDoctors()
        {
            List<Doctor> doctors = _unitOfWork.doctorRepo.GetAll();

            return doctors.Select(d => new GetAllDoctorsDto
            {

                Id = d.Id,
                Name = d.Name,
                Title = d.Title,
                Description = d.Description,
                SpecializationName = d.specialization.Name,
                ImageFileName = d.FileName,
                ImageStoredFileName = d.StoredFileName,
                ImageContentType = d.ContentType,
                Status = d.Status,
                WeekSchadual = d.weeks
                .Select(d => new WeekScheduleForDoctorsDto
                {
                    Id = d.Id,
                    DayOfWeek = d.DayOfWeek,
                    LimitOfPatients = d.LimitOfPatients,
                    StartTime = d.StartTime.ToShortTimeString(),
                    EndTime = d.EndTime.ToShortTimeString(),
                    IsAvailable = d.IsAvailable
                }).ToList()
            }).ToList();
        }

        public GetDoctorByIDDto GetDoctorBYId(string id)
        {
            Doctor? dbDoctor = _unitOfWork.doctorRepo.GetById(id);
            if (dbDoctor is null)
                return null!;

            return new GetDoctorByIDDto
            {
                ID = dbDoctor.Id,
                Name = dbDoctor.Name,
                Title = dbDoctor.Title,
                Description = dbDoctor.Description,
                SpecializationName = dbDoctor.specialization.Name,
                WeekSchadual = dbDoctor.weeks
                .Select(d => new WeekScheduleForDoctorsDto
                {
                    Id = d.Id,
                    DayOfWeek = d.DayOfWeek,
                    StartTime = d.StartTime.ToShortTimeString(),
                    EndTime = d.EndTime.ToShortTimeString(),
                    IsAvailable = d.IsAvailable
                }).ToList(),
                ImageFileName = dbDoctor.FileName,
                ImageStoredFileName = dbDoctor.StoredFileName,
                ImageContentType = dbDoctor.ContentType,
            };
        }


        public List<GetDoctorsBySpecializationDto> GetDoctorsBySpecialization(int id)
        {
            var dbSpecializationDoctors = _unitOfWork.doctorRepo.GetDoctorsBySpecialization(id);
            return dbSpecializationDoctors.Select(s => new GetDoctorsBySpecializationDto
            {
                id = s.Id,
                Name = s.Name,

                ChildDoctorOfSpecializations = s.Doctors
                .Select(d => new ChildDoctorOfSpecializationDto
                {
                    Id = d.Id,
                    Name = d.Name,
                    Title = d.Title,
                    Description = d.Description,
                    ImageFileName = d.FileName,
                    ImageStoredFileName = d.StoredFileName,
                    ImageContentType = d.ContentType,
                    Status = d.Status,
                    WeekSchadual = d.weeks
                .Select(d => new WeekScheduleForDoctorsDto
                {
                    Id = d.Id,
                    DayOfWeek = d.DayOfWeek,
                    LimitOfPatients = d.LimitOfPatients,
                    StartTime = d.StartTime.ToShortTimeString(),
                    EndTime = d.EndTime.ToShortTimeString(),
                    IsAvailable = d.IsAvailable
                }).ToList()
                }).ToList()
            }).ToList();
        }

        public GetAllWeekScheduleDto? GetAllWeekScheduleByDoctorId(string id)
        {
            var doctor = _unitOfWork.weekScheduleRepo.GetAllWeekSchedule(id);
            return new GetAllWeekScheduleDto
            {

                Name = doctor.Name,
                WeekSchedule = doctor.weeks.Select(d => new GetAllWeekScheduleChildDto
                {

                    DayOfWeek = d.DayOfWeek,
                    IsAvailable = d.IsAvailable,
                    StartTime = d.StartTime.ToShortTimeString(),
                    EndTime = d.EndTime.ToShortTimeString(),
                }).ToList()
            };
        }

        public List<GetAllPatientsWithDateDto> GetAllPatientsWithDate(DateTime date, string DoctorId)
        {
            List<PatientVisit> patientVisits = _unitOfWork.patientRepo.GetAllPatientsByDate(date, DoctorId);
            return patientVisits.Select(pv => new GetAllPatientsWithDateDto
            {
                id = pv.Id,
                PatientId = pv.PatientId,
                Name = pv?.Patient?.Name,
                PatientPhoneNumber = pv?.Patient?.PhoneNumber,
                VisitStatus = pv?.VisitStatus,
                ArrivalTime = pv?.ArrivalTime.ToShortTimeString()!,
                VisitStartTime = pv?.VisitStartTime.ToShortTimeString()!,
                VisitEndTime = pv?.VisitEndTime.ToShortTimeString()!,
            }).ToList();
        }
        #region Add Visit Count Records
        public void AddVisitCountRecords(DateTime StartDate, DateTime EndDate)
        {
            List<Doctor> doctors = _unitOfWork.doctorRepo.GetAll();

            DateTime start = StartDate;
            DateTime end = EndDate;
            TimeSpan difference = end.Subtract(start);
            double days = difference.TotalDays;
            DateTime now = DateTime.Now.Date;
            foreach (Doctor doctor in doctors)
            {
                for (int j = 0; j <= days; j++)
                {


                    DayOfWeek Day = start.AddDays(j).DayOfWeek;
                    VisitCount v = _unitOfWork.visitCountRepo.GetCount(start.AddDays(j), doctor.Id);
                    if (v == null && StartDate >= now)
                    {
                        WeekSchedule? weekSchedule = _unitOfWork.visitCountRepo.GetWeekSchedule(Day, doctor.Id);

                         if (weekSchedule != null && doctor.Status)
                        {
                            VisitCount visitCount = new VisitCount
                            {
                                DoctorId = doctor.Id,
                                Date = start.AddDays(j),
                                LimitOfPatients = weekSchedule.LimitOfPatients,
                                WeekScheduleId = weekSchedule.Id,
                                ActualNoOfPatients = 0,
                                Day = weekSchedule.DayOfWeek,

                            };


                            _unitOfWork.visitCountRepo.AddVisitCountRecords(visitCount);
                            _unitOfWork.SaveChanges();

                        }
                    }


                }
            }

        }
        #endregion


        #region get visit count
        public VisitCountDto GetVisitCount(DateTime date, string doctorId)
        {
            VisitCount visitCount = _unitOfWork.visitCountRepo.GetCount(date, doctorId);
            if (visitCount == null) { return null; }
            return new VisitCountDto
            {
                Id = visitCount.Id,
                Date = date.ToShortDateString(),
                DoctorId = doctorId,
                ActualNoOfPatients = visitCount.ActualNoOfPatients,
                LimitOfPatients = visitCount.LimitOfPatients,
                WeekScheduleId = visitCount.WeekScheduleId,
                Day = visitCount.Date.DayOfWeek,

            };
        }
        #endregion
        public GetPatientForDoctorDto? GetPatientForDoctorId(string id)
        {
            Patient? dbPatient = _unitOfWork.patientRepo.GetPatientForDoctor(id);
            if (dbPatient is null)
                return null!;



            return new GetPatientForDoctorDto
            {
                Name = dbPatient.Name,
                Gender = dbPatient.Gender,
                DateOfBirth = dbPatient.DateOfBirth,
                medicaHistory = new GetMedicalHistoryByPhoneDto
                {
                    MartialStatus = dbPatient.MedicaHistory.MartialStatus,
                    Depression = dbPatient.MedicaHistory.Depression,
                    Allergies = dbPatient.MedicaHistory.Allergies,
                    Diabetes = dbPatient.MedicaHistory.Diabetes,
                    Smoker = dbPatient.MedicaHistory.Smoker,
                    AnxityOrPanicDisorder = dbPatient.MedicaHistory.AnxityOrPanicDisorder,
                    Asthma = dbPatient.MedicaHistory.Asthma,
                    HeartDisease = dbPatient.MedicaHistory.HeartDisease,
                    previousSurgeries = dbPatient.MedicaHistory.previousSurgeries,
                    BloodGroup = dbPatient.MedicaHistory.BloodGroup,
                    Hepatitis = dbPatient.MedicaHistory.Hepatitis,
                    HighBloodPressure = dbPatient.MedicaHistory.HighBloodPressure,
                    LowBloodPressure = dbPatient.MedicaHistory.LowBloodPressure,
                    Medication = dbPatient.MedicaHistory.Medication,
                    Other = dbPatient.MedicaHistory.Other,
                    pregnancy = dbPatient.MedicaHistory.pregnancy,
                },
                PatientVisitList = dbPatient.PatientVisits
                .Select(s => new GetPatientVisitsChildDTO
                {
                    Comments = s.Comments,
                    ArrivalTime = s.ArrivalTime.ToShortTimeString(),
                    Prescription = s.Prescription,
                    DateOfVisit = s.DateOfVisit.ToShortDateString(),
                    Symptoms = s.Symptoms,
                    VisitStatus = s.VisitStatus,
                    VisitEndTime = s.VisitEndTime.ToShortTimeString(),
                    VisitStartTime = s.VisitStartTime.ToShortTimeString()

                }).ToList()
            };
        }
        public bool UpdatePatientVisit(UpdatePatientVisitDto updateDto)
        {
            PatientVisit? dbVisit = _unitOfWork.patientVisitRepo.GetById(updateDto.Id);
            if (dbVisit == null) { return false; }
            dbVisit.Comments = updateDto.Comments;
            dbVisit.Symptoms = updateDto.Symptoms;
            dbVisit.Prescription = updateDto.Prescription;
            _unitOfWork.patientVisitRepo.UpdatePatientVisit(dbVisit);
            _unitOfWork.SaveChanges();
            return true;
        }

        #region UploadImage
        public async Task<List<Doctor>> UploadDoctorImage(string doctorId, List<IFormFile> imageFiles)
        {
            if (imageFiles == null || imageFiles.Count == 0)
            {
                return new List<Doctor>();
            }
            List<Doctor> doctors = new List<Doctor>();
            foreach (var file in imageFiles)
            {
                if(file.Length > 0)
                {
                    var fileExtension = Path.GetExtension(file.FileName);
                    var fakeFileName = $"{Guid.NewGuid().ToString()}{fileExtension}";
                    var storedFileName = "wwwroot/" + "UploadImages/" + fakeFileName;
                    var directory = Path.GetDirectoryName(storedFileName);
                    if (!Directory.Exists(directory))
                    {
                        Directory.CreateDirectory(directory);
                    }
                    Doctor doctor = new Doctor
                    {
                        Id = doctorId,
                        FileName = file.FileName,
                        ContentType = file.ContentType,
                        StoredFileName = storedFileName,
                    };
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), storedFileName);

                    using (FileStream fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        await file.CopyToAsync(fileStream);
                    }
                    doctors.Add(doctor);


                }
            }


            _unitOfWork.doctorRepo.UploadDoctorImage(doctors);
            _unitOfWork.SaveChanges();

            return doctors;

        }

        #endregion
        #region UpdateMedical History
        public bool UpdateMedicalHistory(UpdateMedicalHistoryDto updateDto)
        {

            MedicaHistory? dbVisit = _unitOfWork.medicalHistoryRepo.GetById(updateDto.Id);
            if (dbVisit == null)
            {
                return false;
            }
            dbVisit.MartialStatus = updateDto.MartialStatus;
            dbVisit.MartialStatus = updateDto.MartialStatus;
            dbVisit.pregnancy = updateDto.pregnancy;
            dbVisit.BloodGroup = updateDto.BloodGroup;
            dbVisit.previousSurgeries = updateDto.previousSurgeries;
            dbVisit.Medication = updateDto.Medication;
            dbVisit.Smoker = updateDto.Smoker;
            dbVisit.Diabetes = updateDto.Diabetes;
            dbVisit.HighBloodPressure = updateDto.HighBloodPressure;
            dbVisit.LowBloodPressure = updateDto.LowBloodPressure;
            dbVisit.Asthma = updateDto.Asthma;
            dbVisit.Hepatitis = updateDto.Hepatitis;
            dbVisit.HeartDisease = updateDto.HeartDisease;
            dbVisit.AnxityOrPanicDisorder = updateDto.AnxityOrPanicDisorder;
            dbVisit.Depression = updateDto.Depression;
            dbVisit.Allergies = updateDto.Allergies;
            dbVisit.Other = updateDto.Other;

            _unitOfWork.medicalHistoryRepo.UpdateMedicaHistory(dbVisit);
            _unitOfWork.SaveChanges();
            return true;
        }
        #endregion
        #region AddMedicalHistroy
        public void AddMedicaHistory(AddMedicalHistroyDto AddMedicaHistoryDto)
        {
            MedicaHistory medicaHistory = new MedicaHistory
            {
                PatientId = AddMedicaHistoryDto.PatientId,
                Asthma = AddMedicaHistoryDto.Asthma,
                LowBloodPressure = AddMedicaHistoryDto.LowBloodPressure,
                HighBloodPressure = AddMedicaHistoryDto.HighBloodPressure,
                Diabetes = AddMedicaHistoryDto.Diabetes,
                pregnancy = AddMedicaHistoryDto.pregnancy,
                MartialStatus = AddMedicaHistoryDto.MartialStatus,
                Allergies = AddMedicaHistoryDto.Allergies,
                Depression = AddMedicaHistoryDto.Depression,
                AnxityOrPanicDisorder = AddMedicaHistoryDto.AnxityOrPanicDisorder,
                HeartDisease = AddMedicaHistoryDto.HeartDisease,
                Medication = AddMedicaHistoryDto.Medication,
                previousSurgeries = AddMedicaHistoryDto.previousSurgeries,
                BloodGroup = AddMedicaHistoryDto.BloodGroup,
                Other = AddMedicaHistoryDto.Other,
                Hepatitis = AddMedicaHistoryDto.Hepatitis,

            };
            _unitOfWork.medicalHistoryRepo.AddMedicaHistory(medicaHistory);
            _unitOfWork.SaveChanges();

        }
            #endregion
            #region GetDoctroByPhone
            public GetDoctorByPhoneDto? getDoctorByPhoneDTO(string phoneNumber)
            {
                Doctor? doctor = _unitOfWork.doctorRepo.GetDoctorByPhoneNumber(phoneNumber);

                if (doctor == null) { return null; }

                return new GetDoctorByPhoneDto
                {
                    ID = doctor.Id,
                    DateOfBirth = doctor.DateOfBirth.ToLongDateString(),
                    Name = doctor.Name,
                    PhoneNumber = phoneNumber,
                    Title = doctor.Title,
                    Salary = doctor.Salary,
                    Description = doctor.Description,
                    SpecializationName = doctor.specialization.Name,
                    Status = doctor.Status,
                    WeekSchadual = doctor.weeks

               .Select(d => new WeekScheduleForDoctorsDto
               {
                   Id = d.Id,
                   DayOfWeek = d.DayOfWeek,
                   StartTime = d.StartTime.ToShortTimeString(),
                   EndTime = d.EndTime.ToShortTimeString(),
                   IsAvailable = d.IsAvailable
               }).ToList(),
                    ImageFileName = doctor.FileName,
                    ImageStoredFileName = doctor.StoredFileName,
                    ImageContentType = doctor.ContentType,
                };


            }


            #endregion

            #region GetMutualVisits
            public List<GetPatientVisitsChildDTO> GetMutualVisits(string? patientPhone, string? doctorPhone)
            {
                List<PatientVisit> patientVisit = _unitOfWork.doctorRepo.GetMutualVisits(patientPhone, doctorPhone);
                return patientVisit.Select(s =>
                    new GetPatientVisitsChildDTO
                    {
                        Id = s.Id,
                        PatientId = s.PatientId,
                        DoctorId = s.DoctorId,
                        Review = s.Review,


                        Comments = s.Comments,
                        ArrivalTime = s.ArrivalTime.ToShortTimeString(),
                        Prescription = s.Prescription,
                        DateOfVisit = s.DateOfVisit.ToShortDateString(),
                        Symptoms = s.Symptoms,
                        VisitStatus = s.VisitStatus,
                        VisitEndTime = s.VisitEndTime.ToShortTimeString(),
                        VisitStartTime = s.VisitStartTime.ToShortTimeString()

                    }).ToList();


            }
        
            #endregion

            //#region UpdateImge
            //public void UpdateDoctorImage(string doctorId, string fileName, string storedFileName, string contentType)
            //{
            //    if (string.IsNullOrEmpty(doctorId) || string.IsNullOrEmpty(fileName) || string.IsNullOrEmpty(contentType))
            //    {
            //        return;
            //    }

            //    // Assuming the original location is in the "UploadImages" folder
            //    var originalFilePath = Path.Combine(Directory.GetCurrentDirectory(), "UploadImages", storedFileName);

            //    // Create a new unique file name for the moved file
            //    var fakeFileName = Path.GetRandomFileName();
            //    var newStoredFileName = Path.Combine("UploadImages", fakeFileName);

            //    var newFilePath = Path.Combine(Directory.GetCurrentDirectory(), newStoredFileName);

            //    var directory = Path.GetDirectoryName(newFilePath);
            //    if (!Directory.Exists(directory))
            //    {
            //        Directory.CreateDirectory(directory);
            //    }

            //    using (FileStream originalFileStream = new FileStream(originalFilePath, FileMode.Open))
            //    {
            //        using (FileStream newFileStream = new FileStream(newFilePath, FileMode.Create))
            //        {
            //            originalFileStream.CopyTo(newFileStream);
            //        }
            //    }

            //    _unitOfWork.doctorRepo.UpdateDoctorImage(doctorId, fileName, newStoredFileName, contentType);
            //    _unitOfWork.SaveChanges();
            //}
            //#endregion
        }
    }
   