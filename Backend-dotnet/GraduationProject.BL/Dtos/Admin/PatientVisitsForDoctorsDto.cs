using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraduationProject.BL
{
    public class PatientVisitsForDoctorsDto
    {
        public int Id { get; set; }
        public string doctorId { get; set; }
        public string patientId { get; set; }

    }
}
