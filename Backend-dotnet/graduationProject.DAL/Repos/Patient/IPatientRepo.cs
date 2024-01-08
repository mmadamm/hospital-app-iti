using graduationProject.DAL.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace graduationProject.DAL
{
    public interface IPatientRepo : IGenaricRepo<Patient>
    {
        /* public List<Doctor> GetAllDoctors();*/
        public Patient? GetPatientByPhoneNumber(string phoneNumber);

        public MedicaHistory? GetMedicaHistoryByPhoneNumber(string phoneNumber);
        //public List<PatientVisit>?  GetPatientVisitsByPhoneNumber(string phoneNumber);
        public Patient? GetPatientVisitsByPhoneNumber(string phoneNumber);
        public List<PatientVisit> GetAllPatientsByDate(DateTime date, string doctorId);
        public Patient? GetPatientForDoctor(string patientId);

    }
}
