using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace graduationProject.DAL
{
    public interface IMedicalHistoryRepo
    {
        public MedicaHistory? GetById(int? id);

        public void UpdateMedicaHistory(MedicaHistory MedicaHistory);

        public void AddMedicaHistory(MedicaHistory MedicaHistory);
    }
}
