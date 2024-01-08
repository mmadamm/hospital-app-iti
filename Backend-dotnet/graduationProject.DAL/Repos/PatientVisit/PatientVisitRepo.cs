using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace graduationProject.DAL
{
    public class PatientVisitRepo : IPatientVisitRepo
    {
        private readonly HospitalContext _context;
        public PatientVisitRepo(HospitalContext context)
        {
                _context = context; 
        }
        public PatientVisit? GetById(int? id)
        {
            return _context.Set<PatientVisit>().FirstOrDefault(d => d.Id == id);
        }

        public void AddPatientVisit(PatientVisit patientVisit)
        {
            _context.Set<PatientVisit>().Add(patientVisit);
        }

        public void UpdatePatientVisit(PatientVisit patientVisit)
        {
            _context.Set<PatientVisit>().Update(patientVisit);
        }

        public void DeletePatientVisit(int? id)
        {
            var patientVisit = _context.Set<PatientVisit>().Find(id);
            if (patientVisit != null)
            {
                _context.Set<PatientVisit>().Remove(patientVisit);

                _context.SaveChanges();
            }
        }

        public PatientVisit GetVisitById(int? id)
        {
            return _context.Set<PatientVisit>().Find(id);
        }
    }
}
