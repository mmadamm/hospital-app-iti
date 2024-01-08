using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraduationProject.BL.Dtos
{
    public class GetPatientVisitsChildDTO
    {
        public int Id { get; set; }
        public string? Review { get; set; }
        public int? Rate { get; set; } 
        public string? PatientId { get; set; }
        public string? DoctorId { get; set; }
        public string? DateOfVisit { get; set; }
        public string? Comments { get; set; }
        public string? Symptoms { get; set; }
        public String? VisitStatus { get; set; }
        public string? ArrivalTime { get; set; }
        //waiting time = time of arrival - visit start time
        public string? VisitStartTime { get; set; }
        public string? VisitEndTime { get; set; }
        //In Progress Time = vist start time - visit end time
        public string? Prescription { get; set; }
        public string? DoctorName { get; set; }
    }
}
