using graduationProject.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraduationProject.BL
{
    public class GetTopRatedDoctorsDto
    {
        public string? Id { get; set; }

        public string? Name { get; set; }

        public double AverageRate { get; set; }

        public int? SpecializationId { get; set; } = 0;

        public ICollection<VisitCount> visitCounts { get; set; } = new HashSet<VisitCount>();

        public ICollection<PatientVisit> patientVisits { get; set; } = new HashSet<PatientVisit>();
    }
}
