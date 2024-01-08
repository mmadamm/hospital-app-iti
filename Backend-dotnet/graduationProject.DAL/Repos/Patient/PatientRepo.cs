using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace graduationProject.DAL
{
    public class PatientRepo : GenaricRepo<Patient>, IPatientRepo
    {
        private readonly HospitalContext _context;

        public PatientRepo(HospitalContext context) : base(context)
        {
            _context = context;
        }

        #region GetPatientByPhone
        public Patient? GetPatientByPhoneNumber(string phoneNumber)
        {
            return _context.Set<Patient>().FirstOrDefault(x => x.PhoneNumber == phoneNumber);
        }

        #endregion

        #region GetMedicalHistoryByPhoneNumber
        public MedicaHistory? GetMedicaHistoryByPhoneNumber(string phoneNumber)
        {
            Patient? patient = _context.Set<Patient>().FirstOrDefault(p => p.PhoneNumber == phoneNumber);
            if (patient == null) { return null; }
            MedicaHistory? medicaHistory = _context.Set<MedicaHistory>().FirstOrDefault(m => m.PatientId == patient.Id);
            if (medicaHistory == null) { return null; }

            return medicaHistory;
        }

        #endregion
        #region GetPatientVisitsByPhoneNumber
        public Patient? GetPatientVisitsByPhoneNumber(string phoneNumber)
        {
            Patient? patient = _context.Set<Patient>().Include(p => p.PatientVisits).ThenInclude(pv => pv.Doctor).FirstOrDefault(p => p.PhoneNumber == phoneNumber);
            if (patient == null) { return null; }
            return patient;
        }


        #endregion
        #region GetPatientForDoctor

        public Patient? GetPatientForDoctor(string patientId)
        {
            return _context.Set<Patient>().Include(p=>p.MedicaHistory).Include(p=>p.PatientVisits).FirstOrDefault(d => d.Id == patientId);
        }
        #endregion


        #region GetAllPatientsWithDate
        public List<PatientVisit> GetAllPatientsByDate(DateTime date, string doctorId)
        {
            
            return _context.Set<PatientVisit>()
                .Include(pv => pv.Patient)
                .Where(visit => visit.DateOfVisit.Date == date.Date && visit.DoctorId == doctorId)
                .ToList();
            /*return _context.Set<pati>
                .Where(visit => visit.DateOfVisit.Date == date.Date && visit.DoctorId == doctorId)
                .ToList();*/

            /*            List<Patient> patientsList = new List<Patient>();

                        foreach (PatientVisit patientVisit in patientVisitsList)
                        {
                            Patient? patient = _context.Set<Patient>()
                                .Where(p => p.Id == patientVisit.PatientId)
                                .FirstOrDefault();

                            if (patient != null)
                            {
                                patientsList.Add(patient);
                            }
                        }

                        return patientsList;*/
        }
        #endregion

      
    }
}
