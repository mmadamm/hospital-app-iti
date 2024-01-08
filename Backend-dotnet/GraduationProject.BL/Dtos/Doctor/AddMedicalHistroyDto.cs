using graduationProject.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraduationProject.BL.Dtos
{
    public class AddMedicalHistroyDto
    {
            public string? PatientId { get; set; }
            public bool MartialStatus { get; set; }
            public bool? pregnancy { get; set; }
            public string? BloodGroup { get; set; }
            public string? previousSurgeries { get; set; }
            public string? Medication { get; set; }
            public bool Smoker { get; set; }
            public bool Diabetes { get; set; }
            public bool HighBloodPressure { get; set; }
            public bool LowBloodPressure { get; set; }
            public bool Asthma { get; set; }
            public char? Hepatitis { get; set; }
            public bool HeartDisease { get; set; }
            public bool AnxityOrPanicDisorder { get; set; }
            public bool Depression { get; set; }
            public bool Allergies { get; set; }
            public String? Other { get; set; }
       
    }
}
