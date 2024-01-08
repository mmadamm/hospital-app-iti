using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraduationProject.BL.Dtos
{
    public class GetPatientVisitDto
    {
        public string? PatientId { get; set; }
        public string? Name { get; set; }
        

        public List<GetPatientVisitsChildDTO>? PatientVisits { get; set; } = new();
    }
}
