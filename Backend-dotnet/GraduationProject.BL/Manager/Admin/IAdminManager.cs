using graduationProject.DAL;
using graduationProject.DAL.Data.Models;
using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraduationProject.BL
{
    public interface IAdminManager
    {
        public Doctor UpdateDoctorById(UpdateDoctorStatusDto updateDoctor, string id);
        public void AddWeekSchedule(AddWeekScheduleDto addWeekSchedule);
        public GetDoctorByIDForAdminDto GetDoctorByIdForAdmin(string id);

        public Doctor ChangeDoctorStatus(string doctorId);

        public void AddSpecialization(AddSpecializationDto? specialization);

        Task<Admin> UploadAdminImage(string adminId, IFormFile imageFile);

        public GetAdminByPhoneNumberDto GetAdminByPhoneNumber(string phoneNumber);
        public List<GetAllSpecializationForAdminDto> GetAllSpecializations();

        public List<GetTopRatedDoctorsDto> GetAverageRateForEachDoctor();

        public int GetNumberOfPatientsForADay(DateTime date);

        public int GetNumberOfAvailableDoctorInADay(DateTime date);

        public int GetNumberOfPatientsForAPeriod(DateTime startDate, DateTime endDate);

        public List<PatientVisit> GetPatientVisitsInAPeriodAndSpecialization(DateTime startDate, DateTime endDate, int specializationId);
        public List<GetDoctorsVisitsNumberDto> GetDoctorsPatientVisitsNumber();


        public WeekScheduleForDoctorsDto GetWeekScheduleById(int id);
        public WeekSchedule UpdateWeekScheduleRecord(WeekScheduleForDoctorsDto weekSchedule, int id);

        public Admin UpdateAdminByPhone(UpdateAdminByPhoneDto adminDto, string phone);

        public GetAllPatientsWithDateDto UpdateArrivedPatientStatus(UpdateArrivalPatientStatusDto updateArrivalPatientStatusDto);
        public GetReceptionByPhoneNumberDto GetReceptionByPhoneNumber(string phoneNumber);
        public List<GetRateAndReviewDto> GetRateAndReviewByDocIdAndDate(DateTime date, string id);

    }
}
