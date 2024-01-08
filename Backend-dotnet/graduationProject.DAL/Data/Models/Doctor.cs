using graduationProject.DAL.Data.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using ServiceStack.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace graduationProject.DAL
{
    public class Doctor : IdentityUser
    {
        public string Name { get; set; } = string.Empty;
        //public IFormFile? Photo { get; set; }
        public string? Title { get; set; }
        #region uploadImages
        public string? FileName { get; set; }
        public string? StoredFileName { get; set; }
        public string? ContentType { get; set; }
        #endregion
        public string? Description { get; set; }
        public int? SpecializationId { get; set; } = 0;
        public decimal Salary { get; set; } 

        public DateTime DateOfBirth { get; set; }

        public string? AssistantID { get; set; }

        [Required]
        public string? AssistantName { get; set; } 

        [Unique]
        public string? AssistantPhoneNumber { get; set; }

        public DateTime AssistantDateOfBirth { get; set; }

        public Boolean Status { get; set; } = true;

        public double AverageRate { get; set; }

        public ICollection<PatientVisit> patientVisits { get; set; } = new HashSet<PatientVisit>();
        public ICollection<WeekSchedule> weeks { get; set; } = new HashSet<WeekSchedule>();
        public Specialization? specialization {  get; set; }

        public ICollection<VisitCount> visitCounts { get; set; } = new HashSet<VisitCount>();


    }
}
