using ServiceStack.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraduationProject.BL
{
    public class GetAllDoctorsForAdminDto
    {
        public string Id { get; set; }
        public string Name { get; set; } = string.Empty;
        //public IFormFile? Photo { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public decimal Salary { get; set; }
        public string? DateOfBirth { get; set; }
        public string? AssistantID { get; set; }
        public string? AssistantName { get; set; }
        public string? AssistantPhoneNumber { get; set; }
        public string? AssistantDateOfBirth { get; set; }
        public Boolean Status { get; set; }
    }
}
