using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraduationProject.BL.Dtos
{
    public class DoctorsForAllSpecializations
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public Boolean Status { get; set; }

        public List<WeekScheduleForDoctorsDto>? WeekSchadual { get; set; }

    }
}
