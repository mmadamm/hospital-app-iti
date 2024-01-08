using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraduationProject.BL
{
    public class GetRateAndReviewDto
    {
        public int Id { get; set; }
        public string DateOfVisit { get; set; }
        public string? Review { get; set; }
        public int? Rate { get; set; }
        public string? DoctorId { get; set; }
        public string? PatientId { get; set; }
        public string? PatientName { get; set; }
        public string? PatientPhoneNumber { get; set; }
    }
}
