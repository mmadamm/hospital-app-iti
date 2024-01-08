using graduationProject.DAL.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace graduationProject.DAL
{
    public interface IAdminRepo
    {
        public Doctor? UpdateDoctorById(string doctorId);
        public Doctor? ChangeDoctorStatus(string doctorId);

        public void AddSpecialization(Specialization? specialization);
        public Admin? GetAdminByPhoneNumber(string PhoneNumber);
        public Specialization GetSpecializationByAdmin(int? id);
        public void AddWeekSchedule(WeekSchedule schedule);

        public List<Doctor> GetAverageRateForEachDoctor();

        public int GetNumberOfPatientsForADay(DateTime date);

        public int GetNumberOfAvailableDoctorInADay(DateTime date);

        public int GetNumberOfPatientsForAPeriod(DateTime startDate, DateTime endDate);

        public List<PatientVisit> GetPatientVisitsInAPeriodAndSpecialization(DateTime startDate, DateTime endDate, int specializationId);
        public List<Doctor> GetDoctorsPatientVisitsNumber();




        public void UpdateWeekScheduleRecord(WeekSchedule schedule);

        public WeekSchedule? GetWeekScheduleById(int id);

        public PatientVisit UpdateArrivedPatientStatus(PatientVisit patientVisit);
        public PatientVisit GetVisit(int id);
        public void UpdateAdminByPhone(Admin admin);
        void UploadAdminImage(Admin admin);
        public Reception? GetReceptionByPhoneNumber(string PhoneNumber);
        public List<PatientVisit> GetVisitRateAndReview(DateTime date, string DoctorId);
    }
}
