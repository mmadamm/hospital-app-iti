using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraduationProject.BL.Dtos.Doctor
{
    public class GetDoctorByPhoneDto
    {
        public string? ID { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? PhoneNumber { get; set; }
        public decimal Salary { get; set; }
        public string DateOfBirth { get; set; }
        public string SpecializationName { get; set; } = "";
        public List<WeekScheduleForDoctorsDto>? WeekSchadual { get; set; }
        public string? ImageFileName { get; set; }
        public string? ImageStoredFileName { get; set; }
        public string? ImageContentType { get; set; }
        public string? ImageUrl { get; set; }
        public Boolean Status { get; set; }
    }
}
