using graduationProject.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using GraduationProject.BL.Dtos.Doctor;
using GraduationProject.BL.Dtos;
using Microsoft.AspNetCore.Http;

namespace GraduationProject.BL
{
    public interface IDoctorManager
    {
        public List<GetAllSpecializationsDto> GetAllSpecializations();
        public List<GetAllDoctorsDto> GetAllDoctors();
        public GetDoctorByIDDto GetDoctorBYId(string id);
        public List<GetDoctorsBySpecializationDto> GetDoctorsBySpecialization(int id);
        public GetAllWeekScheduleDto? GetAllWeekScheduleByDoctorId(string id);
        public bool UpdatePatientVisit(UpdatePatientVisitDto updateDto);
        public VisitCountDto GetVisitCount(DateTime date, string doctorId);

        public List<GetAllPatientsWithDateDto> GetAllPatientsWithDate(DateTime date, string DoctorId);
        public GetPatientForDoctorDto? GetPatientForDoctorId(string id);
        public Task<List<Doctor>> UploadDoctorImage(string doctorId, List<IFormFile> imageFiles);

        //public void UpdateDoctorImage(string doctorId, string fileName, string storedFileName, string contentType);

        public GetDoctorByPhoneDto? getDoctorByPhoneDTO(string phoneNumber);

        public void AddVisitCountRecords(DateTime StartDate, DateTime EndDate);

        public List<GetPatientVisitsChildDTO> GetMutualVisits(string? patientPhone, string? doctorPhone);



        public bool UpdateMedicalHistory(UpdateMedicalHistoryDto updateDto);

        public void AddMedicaHistory(AddMedicalHistroyDto AddMedicaHistoryDto);


    }
}
