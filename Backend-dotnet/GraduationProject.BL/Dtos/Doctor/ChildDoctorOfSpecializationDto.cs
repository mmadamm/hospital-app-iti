using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GraduationProject.BL
{
    public class ChildDoctorOfSpecializationDto
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string? Title { get; set; }
        public string? Description { get; set; }
        #region Image
        public string? ImageFileName { get; set; }
        public string? ImageStoredFileName { get; set; }
        public string? ImageContentType { get; set; }
        public string? ImageUrl { get; set; }

        public Boolean Status { get; set; }
        #endregion
        public List<WeekScheduleForDoctorsDto>? WeekSchadual { get; set; }
    }
}
