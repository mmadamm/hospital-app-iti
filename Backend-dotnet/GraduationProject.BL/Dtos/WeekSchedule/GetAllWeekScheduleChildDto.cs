using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraduationProject.BL
{
    public class GetAllWeekScheduleChildDto
    {

        public DayOfWeek? DayOfWeek { get; set; }
        public bool IsAvailable { get; set; }
        public int LimitOfPatients { get; set; } 
        public string? StartTime { get; set; }
        public string? EndTime { get; set; } 

    }
}
