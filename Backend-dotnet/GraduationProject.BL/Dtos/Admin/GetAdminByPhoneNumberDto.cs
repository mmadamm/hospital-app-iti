using graduationProject.DAL;
using GraduationProject.BL.Dtos;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;

namespace GraduationProject.BL
{
    public class GetAdminByPhoneNumberDto
    {
        public string? Id {  get; set; }
        public string? PhoneNumber { get; set; }
        public string? Name { get; set; }
        public string? SpecializationName { get; set; }
        public string? ImageFileName { get; set; }
        public string? ImageStoredFileName { get; set; }
        public string? ImageContentType { get; set; }
        public string? ImageUrl { get; set; }
    }
}
