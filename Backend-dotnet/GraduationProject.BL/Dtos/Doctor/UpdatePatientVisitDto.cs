using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraduationProject.BL
{
    public class UpdatePatientVisitDto
    {
        public int Id {  get; set; }
        public string? DoctorId { get; set; }
        public string? PatientId { get; set; }
        public string? Comments { get; set; }
        public string? Symptoms { get; set; }
        public string? Prescription { get; set; }
    }
}
