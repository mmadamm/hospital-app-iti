using graduationProject.DAL.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace graduationProject.DAL
{
    public interface IVisitCountRepo
    {
        /*public void AddVisitCount(VisitCount visitCount);*/
        public VisitCount? AddOrUpdateVisitCount(VisitCount visitCount);
        public WeekSchedule? GetWeekSchedule(DayOfWeek Day, string DoctorId);
        public VisitCount GetCount(DateTime date, string DoctorId);
        public void AddVisitCountRecords(VisitCount visitCountRecord);


    }
}
