using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace graduationProject.DAL
{
    public class VisitReviewAndRateRepo : IVisitReviewAndRateRepo
    {
        private readonly HospitalContext _context;

        public VisitReviewAndRateRepo(HospitalContext context) 
        {
            _context = context;
        }
        public void Update(PatientVisit entity)
        {
            _context.Set<PatientVisit>().Update(entity);
        }
        public PatientVisit? GetById(int? id)
        {
            return _context.Set<PatientVisit>().FirstOrDefault(d => d.Id == id);
        }
    }
}
