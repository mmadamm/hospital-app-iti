using graduationProject.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraduationProject.BL.Dtos
{
    public class GetAllSpecializationsDto
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public List<DoctorsForAllSpecializations>? DoctorsForAllSpecializations { get; set; }
    }
}
