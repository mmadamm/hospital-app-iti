using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace graduationProject.DAL
{
   public interface IPatientVisitRepo
    {
        public PatientVisit? GetById(int? id);
        public void AddPatientVisit(PatientVisit patientVisit);
        public void UpdatePatientVisit(PatientVisit patientVisit);
        public PatientVisit GetVisitById(int? id);

        public void DeletePatientVisit(int? id);
    }
}
