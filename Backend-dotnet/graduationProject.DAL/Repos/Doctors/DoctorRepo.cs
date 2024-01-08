using graduationProject.DAL.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace graduationProject.DAL
{
    public class DoctorRepo : GenaricRepo<Doctor>, IDoctorRepo
    {
        private readonly HospitalContext _context;

        public DoctorRepo(HospitalContext context) : base(context)
        {
            _context = context;
        }
        public Doctor? GetById(string? id)
        {
            return _context.Set<Doctor>().Include(d => d.specialization).Include(d => d.weeks).FirstOrDefault(d => d.Id == id);
        }
        public List<Doctor> GetAll()
        {
            return _context.Set<Doctor>().Include(d => d.specialization).Include(d => d.weeks).ToList();
        }
        public List<Specialization> GetDoctorsBySpecialization(int SpeializationId)
        { 
            var doctors = _context.Specializations.Include(d => d.Doctors).ThenInclude(d => d.weeks).Where(s => s.Id == SpeializationId).ToList();
            return doctors;
        }
        public List<Specialization> GetAllSpecializations()
        {
            return _context.Set<Specialization>().Include(s => s.Doctors).ThenInclude(d => d.weeks).ToList();
        }
        public void UploadDoctorImage(List<Doctor> doctors)
        {
            foreach (var doctor in doctors)
            {
                var existingDoctor = _context.Set<Doctor>().Find(doctor.Id);
                if (existingDoctor != null)
                {
                    existingDoctor.FileName = doctor.FileName;
                    existingDoctor.StoredFileName = doctor.StoredFileName;
                    existingDoctor.ContentType = doctor.ContentType;
                }
            }


         
            _context.SaveChanges();
        }

        #region GetDoctorByPhone
        public Doctor? GetDoctorByPhoneNumber(string phoneNumber)
        {
            return _context.Set<Doctor>().Include(d => d.specialization).Include(d => d.weeks).FirstOrDefault(x => x.PhoneNumber == phoneNumber);
        }

        #endregion
        public void DeleteImage(string storedFileName)
        {
            if (storedFileName == null)
            {
                return;
            }

            var imagePath = Path.Combine("UploadImages", storedFileName);
            var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", imagePath);

            if (System.IO.File.Exists(fullPath))
            {
                System.IO.File.Delete(fullPath);
            }
        }

        public List<PatientVisit> GetMutualVisits(string? patientPhone, string? doctorPhone)
        {
            Doctor? dr = _context.Set<Doctor>().FirstOrDefault(x => x.PhoneNumber == doctorPhone);
            Patient? pt = _context.Set<Patient>().FirstOrDefault(x => x.PhoneNumber == patientPhone);
            string? doctorId = dr?.Id;
            string? patientId = pt?.Id;
            return _context.Set<PatientVisit>().Where(x => x.PatientId == patientId && x.DoctorId == doctorId).ToList();        
         }

        
        //    public void UpdateDoctorImage(string doctorId, string fileName, string storedFileName, string contentType)
        //{
        //    var existingDoctor = _context.Set<Doctor>().Find(doctorId);
        //    if (existingDoctor != null)
        //    {
        //        existingDoctor.FileName = fileName;
        //        existingDoctor.StoredFileName = storedFileName;
        //        existingDoctor.ContentType = contentType;
        //    }

        //    _context.SaveChanges();
        //}

    }
}
