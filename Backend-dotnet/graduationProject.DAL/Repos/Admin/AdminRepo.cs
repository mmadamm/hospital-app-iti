using graduationProject.DAL.Data.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Scaffolding.Metadata;
using System;
using System.Numerics;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace graduationProject.DAL
{
    public class AdminRepo : IAdminRepo
    {
        private readonly HospitalContext _context;
        public AdminRepo(HospitalContext context)
        {
            _context = context;
        }

        public Admin? GetAdminByPhoneNumber(string PhoneNumber)
        {
            return _context.Set<Admin>().FirstOrDefault(A => A.PhoneNumber == PhoneNumber);

        }
        public Specialization GetSpecializationByAdmin(int? id)
        {
            return _context.Set<Specialization>().Find(id)!;
        }

        public Doctor? UpdateDoctorById(string doctorId)
        {
            Doctor? doctorToUpdate = _context.Set<Doctor>().FirstOrDefault(d => d.Id == doctorId);

            if (doctorToUpdate != null)
            {
                _context.Set<Doctor>().Update(doctorToUpdate);

            }
            return doctorToUpdate;
        }

        public PatientVisit UpdateArrivedPatientStatus(PatientVisit patientVisit )
        {
            _context.Set<PatientVisit>().Update(patientVisit);
            return patientVisit;
        }
        public PatientVisit GetVisit(int id)
        {
            return _context.Set<PatientVisit>().Include(pv => pv.Patient).FirstOrDefault(pv => pv.Id == id)!;
        }
        #region update week schedule record
        public void UpdateWeekScheduleRecord (WeekSchedule schedule)
        {

            _context.Set<WeekSchedule>().Update(schedule);
            _context.SaveChanges();
        }
        #endregion

        #region update admin by id
        public void UpdateAdminByPhone(Admin admin)
        {
            _context.Set<Admin>().Update(admin);
        }
        #endregion

        #region get week schedule record by id
        public WeekSchedule? GetWeekScheduleById(int id)
        {
            return _context.Set<WeekSchedule>().FirstOrDefault(w => w.Id == id);

        }
        #endregion
        public Doctor? ChangeDoctorStatus(string doctorId)
        {
            Doctor? doctorToUpdate = _context.Set<Doctor>().FirstOrDefault(d => d.Id == doctorId);
            if (doctorToUpdate != null)
            {
                _context.Set<Doctor>().Update(doctorToUpdate);

            }
            return doctorToUpdate;

        }

        public void AddSpecialization(Specialization? specialization)
        {
            if (specialization == null)
            {
                throw new ArgumentNullException(nameof(specialization), "Specialization cannot be null.");
            }

            _context.Set<Specialization>().Add(specialization);



        }

        #region add week schedule
        public void AddWeekSchedule(WeekSchedule schedule)
        {

            _context.Set<WeekSchedule>().Add(schedule);
            _context.SaveChanges();
        }
        #endregion


        public List<Doctor> GetAverageRateForEachDoctor()
        {
            var doctorAverages = _context.Set<PatientVisit>()
                .Join(_context.Set<Doctor>(),
                    visit => visit.DoctorId,
                    doctor => doctor.Id,
                    (visit, doctor) => new
                    {
                        DoctorId = doctor.Id,
                        DoctorName = doctor.Name,
                        SpecializationId = doctor.SpecializationId,
                        VisitCount = doctor.visitCounts,
                        PatientVisit = doctor.patientVisits,


                        Rate = visit.Rate
                    })
                .GroupBy(result => result.DoctorId)
                .Select(group => new Doctor
                {
                    Id = group.Key,
                    Name = group.First().DoctorName,
                    SpecializationId = group.First().SpecializationId,
                    visitCounts = group.First().VisitCount,
                    patientVisits = group.First().PatientVisit,
                    AverageRate = group.Average(result => result.Rate)??0.0
                })
                .ToList();

            return doctorAverages;
        }


        public int GetNumberOfPatientsForADay(DateTime date)
        {
            return _context.Set<PatientVisit>().Where(s => s.DateOfVisit.Date == date.Date).Count();
        }

        public int GetNumberOfAvailableDoctorInADay(DateTime date)
        {
            return _context.Set<VisitCount>().Include(s=>s.WeekSchedule).Where(s => s.Date.Date == date.Date && s.LimitOfPatients!=0).Count();
        }

        public int GetNumberOfPatientsForAPeriod(DateTime startDate, DateTime endDate)
        {
            return _context.Set<PatientVisit>().Count(s => s.DateOfVisit.Date >= startDate.Date && s.DateOfVisit.Date <= endDate.Date);
        }

       
        public List<PatientVisit> GetPatientVisitsInAPeriodAndSpecialization(DateTime startDate, DateTime endDate, int specializationId)
        {
            
            var patientVisits = _context.Set<PatientVisit>()
                .Where(visit => visit.DateOfVisit.Date >= startDate.Date && visit.DateOfVisit.Date <= endDate.Date && visit.Doctor.SpecializationId == specializationId)
                .ToList();

            return patientVisits;
        }

        public List<Doctor> GetDoctorsPatientVisitsNumber()
        {
            return _context.Set<Doctor>()
                .Include(d => d.patientVisits)
                .Include(d => d.visitCounts)
                .ToList();
        }
        #region get reception by phone number
        public Reception? GetReceptionByPhoneNumber(string PhoneNumber) 
        {
            return _context?.Set<Reception>().FirstOrDefault(r => r.PhoneNumber == PhoneNumber);
        }
        #endregion

        public void UploadAdminImage(Admin admin)
        {
            {
                var existingAdmin = _context.Set<Admin>().Find(admin.Id);
                DeleteImage(existingAdmin.StoredFileName);

                existingAdmin.FileName = admin.FileName;
                existingAdmin.StoredFileName = admin.StoredFileName;
                existingAdmin.ContentType = admin.ContentType;


                _context.SaveChanges();
            }

        }

        public void DeleteImage(string storedFileName)
        {
            if (storedFileName == null)
            {
                return;
            }

            var imagePath = Path.Combine("AdminImages", storedFileName);
            var fullPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", imagePath);

            if (System.IO.File.Exists(fullPath))
            {
                System.IO.File.Delete(fullPath);
            }
        }
        #region get rate and review by doctor Id and date
        public List<PatientVisit> GetVisitRateAndReview(DateTime date , string DoctorId)
        {
            return _context.Set<PatientVisit>().Include(pv => pv.Patient).Where(pv => pv.DateOfVisit == date && pv.DoctorId == DoctorId).ToList()!;
        }
        #endregion
    }


}
