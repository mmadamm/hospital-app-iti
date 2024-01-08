using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace graduationProject.DAL
{
    public interface IVisitReviewAndRateRepo
    {
        public void Update(PatientVisit entity);
        public PatientVisit? GetById(int? id);
    }
}
