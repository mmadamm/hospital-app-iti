using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraduationProject.BL
{
    public class UpdatePatientVisitStatusDto
    {
        public int Id { get; set; }
        public string status { get; set; }
        public DateTime ArrivalTime { get; set; }
        public DateTime VisitStartTime { get; set; }
        public DateTime VisitEndTime { get; set; }
    }
}
