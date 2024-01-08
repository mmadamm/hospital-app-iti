using graduationProject.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraduationProject.BL
{
    public class GetDoctorsBySpecializationDto
    {
        public int id {  get; set; }
        public string? Name { get; set; }
        public List<ChildDoctorOfSpecializationDto>? ChildDoctorOfSpecializations { get; set; }
    }
}
