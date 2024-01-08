using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraduationProject.BL.Dtos
{
    public class DoctorSpecializationRegisterDto
    {
        public int id {  get; set; }
        public string? Name { get; set; }
        public List<RegisterDoctorDto>? RegisterDoctorDtos { get; set; }
    }
}
