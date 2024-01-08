using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace graduationProject.DAL
{
    public class MedicalHistoryRepo : IMedicalHistoryRepo
    {
        private readonly HospitalContext _context;
        public MedicalHistoryRepo(HospitalContext context)
        {
            _context = context;
        }
        public MedicaHistory? GetById(int? id)
        {
            return _context.Set<MedicaHistory>().FirstOrDefault(d => d.Id == id);
        }

        public void UpdateMedicaHistory(MedicaHistory MedicaHistory)
        {
            _context.Set<MedicaHistory>().Update(MedicaHistory);
        }

        public void AddMedicaHistory(MedicaHistory MedicaHistory)
        {
            _context.Set<MedicaHistory>().Add(MedicaHistory);
        }

    }
}
