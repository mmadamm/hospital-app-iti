using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraduationProject.BL
{
    public class WeekScheduleForDoctorsDto
    {
        public int Id { get; set; }
        public DayOfWeek? DayOfWeek { get; set; }
        public int LimitOfPatients { get; set; } = 0;
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public bool IsAvailable { get; set; }

    }
}
