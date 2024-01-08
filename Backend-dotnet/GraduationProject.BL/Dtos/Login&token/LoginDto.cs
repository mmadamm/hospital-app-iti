using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraduationProject.BL.Dtos
{
    public class LoginDto
    {
        public string PhoneNumber { get; set; } = string.Empty;
       //public string Name { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }
}
