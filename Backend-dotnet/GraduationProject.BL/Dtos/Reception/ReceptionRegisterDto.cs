using ServiceStack.DataAnnotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraduationProject.BL.Dtos
{
    public class ReceptionRegisterDto
    {
        public string PhoneNumber { get; set; } = string.Empty;
        public string? Name { get; set; }
        public string Password { get; set; } = string.Empty;
    }
}

