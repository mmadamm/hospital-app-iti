using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using ServiceStack.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations.Schema;

namespace graduationProject.DAL
{
    public class Patient : IdentityUser
    {
        public string? Name { get; set; }
        public string? Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
       public MedicaHistory? MedicaHistory { get; set; }
        public ICollection<Reception>? Receptions { set; get; } = new HashSet<Reception>();
        public ICollection<PatientVisit> PatientVisits { set; get; } = new HashSet<PatientVisit>();

    }
}
