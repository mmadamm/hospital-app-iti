using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraduationProject.BL
{
    public class VisitCountDto
    {
        public int Id { get; set; }
        public string? Date { get; set; }
        public int? LimitOfPatients { get; set; }
        public int ActualNoOfPatients { get; set; }
        public string? DoctorId { get; set; }
        public DayOfWeek Day {  get; set; }
        public int? WeekScheduleId { get; set; }
    }
}
