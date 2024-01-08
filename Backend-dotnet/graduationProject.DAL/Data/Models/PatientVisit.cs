using ServiceStack.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace graduationProject.DAL
{
    public class PatientVisit
    {
        public int Id { get; set; }
        public DateTime DateOfVisit { get; set; }
        public string? Comments { get; set; }
        public string? Symptoms { get; set; }
        public String? VisitStatus { get; set; }
        public DateTime ArrivalTime { get; set; }

        //waiting time = time of arrival - visit start time
        public DateTime VisitStartTime { get; set; }
        public DateTime VisitEndTime { get; set; }

        //In Progress Time = vist start time - visit end time
        public string? Prescription { get; set; } //Make sure this is how multivalued attributes are applied ---- migration 
       
        public string? Review { get; set; }
        public int? Rate { get; set; }
        public string? DoctorId { get; set; }
        public string? PatientId { get; set; }
        public Patient? Patient { get; set; }
        public Doctor? Doctor { get; set; } 
    }
}
