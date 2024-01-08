using graduationProject.DAL;
using GraduationProject.BL.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraduationProject.BL
{
    public class GetPatientForDoctorDto
    {
        public string? Name { get; set; }
        public string? Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public GetMedicalHistoryByPhoneDto? medicaHistory { get; set; }
        public List<GetPatientVisitsChildDTO>? PatientVisitList { get; set; }

    }
}
