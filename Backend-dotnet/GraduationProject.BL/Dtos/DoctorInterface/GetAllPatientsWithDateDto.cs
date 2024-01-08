using graduationProject.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraduationProject.BL
{
    public class GetAllPatientsWithDateDto
    {
        public int id {  get; set; }
        public string? PatientId { get; set; }
        public string? Name { get; set; }
        public string? PatientPhoneNumber { get; set; }
        public String? VisitStatus { get; set; }
        public string ArrivalTime { get; set; }
        public string VisitStartTime { get; set; }
        public string VisitEndTime { get; set; }
    }
}
