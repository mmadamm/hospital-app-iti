using graduationProject.DAL.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace graduationProject.DAL
{
    public interface IDoctorRepo : IGenaricRepo<Doctor>
    {
        public Doctor? GetById(string? id);
        public List<Doctor> GetAll();
        public List<Specialization> GetDoctorsBySpecialization(int SpeializationId);
        public List<Specialization> GetAllSpecializations();

        public void UploadDoctorImage(List<Doctor> doctors);
        public Doctor? GetDoctorByPhoneNumber(string phoneNumber);
        public List<PatientVisit> GetMutualVisits(string? patientPhone, string? doctorPhone);



        //void UpdateDoctorImage(string doctorId, string fileName, string storedFileName, string contentType);


    }
}
