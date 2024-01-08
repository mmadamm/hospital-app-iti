using graduationProject.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraduationProject.BL
{
    public class PatientVisitDto
    {
        public DateTime DateOfVisit { get; set; }
        public string? PatientId { get; set; }
    }
}
