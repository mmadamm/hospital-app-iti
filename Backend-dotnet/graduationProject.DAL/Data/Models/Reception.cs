using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace graduationProject.DAL
{
    public class Reception : IdentityUser
    {
        public string? Name { get; set; }
        public ICollection<Patient> Patients { get; set; } = new HashSet<Patient>();
        public Admin? Admin { get; set; }
    }
}
