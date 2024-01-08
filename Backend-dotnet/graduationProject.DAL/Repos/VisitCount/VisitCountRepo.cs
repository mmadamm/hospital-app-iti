using graduationProject.DAL.Data.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace graduationProject.DAL
{
    public class VisitCountRepo : IVisitCountRepo
    {
        HospitalContext _context;

        public VisitCountRepo(HospitalContext context)
        {
              _context = context;
        }

       /* public void AddVisitCount(VisitCount visitCount)
        {
            _context.Set<VisitCount>().Add(visitCount);
        }*/

        public VisitCount? GetCount(DateTime date , string DoctorId) 
        {
            return _context.Set<VisitCount>().FirstOrDefault(d => d.DoctorId == DoctorId && d.Date.Date == date.Date);
        }
        public WeekSchedule? GetWeekSchedule(DayOfWeek Day , string DoctorId)
        {
            return _context.Set<WeekSchedule>().Include(w => w.Doctor).FirstOrDefault(w => w.DayOfWeek == Day && w.Doctor.Id == DoctorId);
        }
        public VisitCount? AddOrUpdateVisitCount(VisitCount visitCount)
        {
            VisitCount? dbVisitCountBy = _context.Set<VisitCount>().FirstOrDefault(v => v.Id == visitCount.Id);

            if (visitCount != null)
            {
                _context.Set<VisitCount>().Update(visitCount);
            }
            else
            {
                _context.Set<VisitCount>().Add(visitCount);
            }
            return visitCount;
        }
        
        public void AddVisitCountRecords (VisitCount visitCountRecord)
        {
            _context.Set<VisitCount?>().Add(visitCountRecord);
        }
    }
}
