using graduationProject.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraduationProject.BL
{
    public  class AddWeekScheduleDto
    {
        public int Id { get; set; }
        public DayOfWeek? DayOfWeek { get; set; }
        public int LimitOfPatients { get; set; } = 0;
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public bool IsAvailable { get; set; }
        public string DoctorId {  get; set; } 


    }
}
