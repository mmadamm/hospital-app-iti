using graduationProject.DAL.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace graduationProject.DAL
{
    public class VisitCount
    {
        public int Id { get; set; }
        public DateTime Date {  get; set; }
        public int ActualNoOfPatients { get; set; } = 0;
        public int? LimitOfPatients { get; set; }
        public string? DoctorId { get; set; }
        public Doctor? Doctor { get; set; }
        public int WeekScheduleId { get; set; }
        public DayOfWeek? Day { get; set; }
        public ICollection<WeekSchedule>? WeekSchedule { get; set; } = new HashSet<WeekSchedule>();
    }
}
