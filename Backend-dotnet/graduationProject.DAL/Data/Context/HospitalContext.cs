using graduationProject.DAL.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace graduationProject.DAL
{
    public class HospitalContext : IdentityDbContext
    {
        public DbSet<Patient> Patients { get; set; }
        public DbSet<PatientVisit> PatientVisits { get; set; }
        public DbSet<Doctor> Doctors { get; set; }
        public DbSet<Admin> Admins { get; set; }
        public DbSet<MedicaHistory> MedicaHistories { get; set; }
        public DbSet<Reception> Receptions { get; set; }
        public DbSet<WeekSchedule> WeekSchedules { get; set; }
        public DbSet<Specialization> Specializations { get; set; }
        public DbSet<VisitCount> VisitCount { get; set; }
        public HospitalContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<IdentityUser>().UseTptMappingStrategy();
        }
        //protected override void OnModelCreating(ModelBuilder builder)
        //{

        //    #region  Admin
        //    var Admin = new List<Admin>
        //            {
        //                new Admin { Name = "Admin 1", PhoneNumber = "1234567890", UserName = "admin1" },
        //               /* new Admin { Name = "Admin 2", PhoneNumber = "9876543210", UserName = "admin2" },
        //                new Admin { Name = "Admin 3", PhoneNumber = "5555555555", UserName = "admin3" },
        //                new Admin { Name = "Admin 4", PhoneNumber = "9999999999", UserName = "admin4" },
        //                new Admin { Name = "Admin 5", PhoneNumber = "1111111111", UserName = "admin5" }*/
        //            };
        //    #endregion
        //    #region  Doctor
        //    var Doctor = new List<Doctor>
        //                {
        //                    new Doctor
        //                    {
        //                        Name = "Doctor 1",
        //                        Title = "Cardiologist",
        //                        Salary = 80000,
        //                        PerformanceRate = 95,
        //                        DateOfBirth = new DateTime(1980, 5, 15),
        //                        PhoneNumber = "1234567890",
        //                        AssistantID = 1,
        //                        AssistantName = "Assistant 1",
        //                        AssistantPhoneNumber = 98765430,
        //                        AssistantDateOfBirth = new DateTime(1990, 3, 10),
        //                    },
        //                    new Doctor
        //                    {
        //                        Name = "Doctor 2",
        //                        Title = "Pediatrician",
        //                        Salary = 75000,
        //                        PerformanceRate = 92,
        //                        DateOfBirth = new DateTime(1975, 8, 20),
        //                        PhoneNumber = "5555555555",
        //                        AssistantID = 2,
        //                        AssistantName = "Assistant 2",
        //                        AssistantPhoneNumber = 77777777,
        //                        AssistantDateOfBirth = new DateTime(1985, 2, 5),
        //                    },
        //                    new Doctor
        //                    {
        //                        Name = "Doctor 3",
        //                        Title = "Dermatologist",
        //                        Salary = 85000,
        //                        PerformanceRate = 96,
        //                        DateOfBirth = new DateTime(1978, 7, 25),
        //                        PhoneNumber = "9999999999",
        //                        AssistantID = 3,
        //                        AssistantName = "Assistant 3",
        //                        AssistantPhoneNumber = 88888888,
        //                        AssistantDateOfBirth = new DateTime(1993, 1, 15),
        //                    },
        //                    new Doctor
        //                    {
        //                        Name = "Doctor 4",
        //                        Title = "Orthopedic Surgeon",
        //                        Salary = 90000,
        //                        PerformanceRate = 98,
        //                        DateOfBirth = new DateTime(1982, 6, 30),
        //                        PhoneNumber = "1111111111",
        //                        AssistantID = 4,
        //                        AssistantName = "Assistant 4",
        //                        AssistantPhoneNumber = 66666666,
        //                        AssistantDateOfBirth = new DateTime(1992, 4, 20),
        //                    },
        //                    new Doctor
        //                    {
        //                        Name = "Doctor 5",
        //                        Title = "Ophthalmologist",
        //                        Salary = 82000,
        //                        PerformanceRate = 94,
        //                        DateOfBirth = new DateTime(1970, 3, 5),
        //                        PhoneNumber = "3333333333",
        //                        AssistantID = 5,
        //                        AssistantName = "Assistant 5",
        //                        AssistantPhoneNumber = 44444444,
        //                        AssistantDateOfBirth = new DateTime(1980, 11, 10),
        //                    },
        //                };
        //    #endregion
        //    #region  MedicaHistory
        //    var MedicaHistory = new List<MedicaHistory>
        //                {
        //                    new MedicaHistory
        //                    {
        //                        Name = "Patient 1",
        //                        MartialStatus = true,
        //                        pregnancy = false,
        //                        BloodGroup = "O+",
        //                        previousSurgeries = "Appendectomy",
        //                        Medication = "Ibuprofen",
        //                        Smoker = false,
        //                        Diabetes = false,
        //                        HighBloodPressure = true,
        //                        LowBloodPressure = false,
        //                        Asthma = false,
        //                        Hepatitis = 'B',
        //                        HeartDisease = false,
        //                        AnxityOrPanicDisorder = true,
        //                        Depression = false,
        //                        Allergies = true,
        //                        Other = "None",
        //                        PatientId = "1",
        //                    },
        //                    new MedicaHistory
        //                    {
        //                        Name = "Patient 2",
        //                        MartialStatus = false,
        //                        pregnancy = true,
        //                        BloodGroup = "A-",
        //                        previousSurgeries = "None",
        //                        Medication = "Aspirin",
        //                        Smoker = true,
        //                        Diabetes = true,
        //                        HighBloodPressure = false,
        //                        LowBloodPressure = false,
        //                        Asthma = false,
        //                        Hepatitis = 'C',
        //                        HeartDisease = true,
        //                        AnxityOrPanicDisorder = false,
        //                        Depression = false,
        //                        Allergies = true,
        //                        Other = "Peanut allergy",
        //                        PatientId = "2",
        //                    },  new MedicaHistory
        //                    {
        //                        Name = "Patient 3",
        //                        MartialStatus = true,
        //                        pregnancy = false,
        //                        BloodGroup = "B+",
        //                        previousSurgeries = "Knee surgery",
        //                        Medication = "Lisinopril",
        //                        Smoker = false,
        //                        Diabetes = true,
        //                        HighBloodPressure = false,
        //                        LowBloodPressure = true,
        //                        Asthma = false,
        //                        Hepatitis = 'A',
        //                        HeartDisease = false,
        //                        AnxityOrPanicDisorder = false,
        //                        Depression = true,
        //                        Allergies = false,
        //                        Other = "None",
        //                        PatientId = "3",
        //                    },
        //                    new MedicaHistory
        //                    {
        //                        Name = "Patient 4",
        //                        MartialStatus = false,
        //                        pregnancy = false,
        //                        BloodGroup = "AB-",
        //                    previousSurgeries = "Gallbladder removal",
        //                    Medication = "Metformin",
        //                    Smoker = true,
        //                    Diabetes = false,
        //                    HighBloodPressure = false,
        //                    LowBloodPressure = false,
        //                    Asthma = true,

        //                    HeartDisease = false,
        //                    AnxityOrPanicDisorder = true,
        //                    Depression = false,
        //                    Allergies = true,
        //                    Other = "Pollen allergy",
        //                    PatientId = "4",
        //                },
        //            };


        //    #endregion
        //    #region Patient
        //    var Patient = new List<Patient>
        //            {
        //                new Patient
        //                {
        //                    UserName = "patient1",
        //                    Gender = "Male",
        //                    DateOfBirth = new DateTime(1990, 5, 10),
        //                    PhoneNumber = "01234567890"
        //                },
        //                new Patient
        //                {
        //                    UserName = "patient2",
        //                    Gender = "Female",
        //                    DateOfBirth = new DateTime(1985, 8, 15),
        //                    PhoneNumber = "01111111111"
        //                },
        //                new Patient
        //                {
        //                    UserName = "patient3",
        //                    Gender = "Male",
        //                    DateOfBirth = new DateTime(1988, 3, 20),
        //                    PhoneNumber = "01123456789"
        //                },
        //                new Patient
        //                {
        //                    UserName = "patient4",
        //                    Gender = "Female",
        //                    DateOfBirth = new DateTime(1995, 7, 25),
        //                    PhoneNumber = "01000000000"
        //                },
        //                new Patient
        //                {
        //                    UserName = "patient5",
        //                    Gender = "Male",
        //                    DateOfBirth = new DateTime(1980, 11, 30),
        //                    PhoneNumber = "01098765432"
        //                },
        //            };
        //    #endregion
        //    #region PatientVisit
        //    var PatientVisit = new List<PatientVisit>
        //            {
        //                new PatientVisit
        //                {
        //                    DateOfVisit = new DateTime(2023, 5, 10),
        //                    Comments = "Routine checkup",
        //                    Symptoms = "None",
        //                    VisitStatus = "Completed",
        //                    ArrivalTime = new DateTime(2023, 5, 10, 9, 0, 0),
        //                    VisitStartTime = new DateTime(2023, 5, 10, 9, 15, 0),
        //                    VisitEndTime = new DateTime(2023, 5, 10, 10, 0, 0),
        //                    Prescription = "No medication required",
        //                },
        //                new PatientVisit
        //                {
        //                    DateOfVisit = new DateTime(2023, 5, 12),
        //                    Comments = "Fever and cough",
        //                    Symptoms = "Fever, cough, and fatigue",
        //                    VisitStatus = "In Progress",
        //                    ArrivalTime = new DateTime(2023, 5, 12, 14, 30, 0),
        //                    VisitStartTime = new DateTime(2023, 5, 12, 14, 45, 0),
        //                    Prescription = "Prescribed antibiotics and rest",
        //                },
        //                new PatientVisit
        //                {
        //                    DateOfVisit = new DateTime(2023, 5, 15),
        //                    Comments = "Follow-up appointment",
        //                    Symptoms = "Steady improvement",
        //                    VisitStatus = "Completed",
        //                    ArrivalTime = new DateTime(2023, 5, 15, 10, 15, 0),
        //                    VisitStartTime = new DateTime(2023, 5, 15, 10, 30, 0),
        //                    VisitEndTime = new DateTime(2023, 5, 15, 11, 0, 0),
        //                    Prescription = "Continue current medication",
        //                },
        //                new PatientVisit
        //                {
        //                    DateOfVisit = new DateTime(2023, 5, 18),
        //                    Comments = "Allergy test",
        //                    Symptoms = "Skin rash and itching",
        //                    VisitStatus = "Scheduled",
        //                    ArrivalTime = new DateTime(2023, 5, 18, 11, 45, 0),
        //                    VisitStartTime = new DateTime(2023, 5, 18, 12, 0, 0),
        //                },
        //                new PatientVisit
        //                {
        //                    DateOfVisit = new DateTime(2023, 5, 20),
        //                    Comments = "Check stitches",
        //                    Symptoms = "Post-surgery follow-up",
        //                    VisitStatus = "Completed",
        //                    ArrivalTime = new DateTime(2023, 5, 20, 16, 0, 0),
        //                    VisitStartTime = new DateTime(2023, 5, 20, 16, 15, 0),
        //                    VisitEndTime = new DateTime(2023, 5, 20, 17, 0, 0),
        //                    Prescription = "Stitches healing well",
        //                },
        //            };
        //    #endregion
        //    //#region PatientVisitsWithDoctor
        //    //var PatientVisitsWithDoctor = new List<PatientVisitsWithDoctor>
        //    //        {
        //    //            new PatientVisitsWithDoctor
        //    //            {
        //    //                Patient = _context.Patients.FirstOrDefault(p => p.UserName == "patient1"),
        //    //                PatientVisit = context.PatientVisits.FirstOrDefault(v => v.DateOfVisit == new DateTime(2023, 5, 10)),
        //    //                Doctor = context.Doctors.FirstOrDefault(d => d.UserName == "doctor1")
        //    //            },
        //    //            new PatientVisitsWithDoctor
        //    //            {
        //    //                Patient = context.Patients.FirstOrDefault(p => p.UserName == "patient2"),
        //    //                PatientVisit = context.PatientVisits.FirstOrDefault(v => v.DateOfVisit == new DateTime(2023, 5, 12)),
        //    //                Doctor = context.Doctors.FirstOrDefault(d => d.UserName == "doctor2")
        //    //            },
        //    //            new PatientVisitsWithDoctor
        //    //            {
        //    //                Patient = context.Patients.FirstOrDefault(p => p.UserName == "patient3"),
        //    //                PatientVisit = context.PatientVisits.FirstOrDefault(v => v.DateOfVisit == new DateTime(2023, 5, 15)),
        //    //                Doctor = context.Doctors.FirstOrDefault(d => d.UserName == "doctor3")
        //    //            },
        //    //            new PatientVisitsWithDoctor
        //    //            {
        //    //                Patient = context.Patients.FirstOrDefault(p => p.UserName == "patient4"),
        //    //                PatientVisit = context.PatientVisits.FirstOrDefault(v => v.DateOfVisit == new DateTime(2023, 5, 18)),
        //    //                Doctor = context.Doctors.FirstOrDefault(d => d.UserName == "doctor4")
        //    //            },
        //    //            new PatientVisitsWithDoctor
        //    //            {
        //    //                Patient = context.Patients.FirstOrDefault(p => p.UserName == "patient5"),
        //    //                PatientVisit = context.PatientVisits.FirstOrDefault(v => v.DateOfVisit == new DateTime(2023, 5, 20)),
        //    //                Doctor = context.Doctors.FirstOrDefault(d => d.UserName == "doctor5")
        //    //            },
        //    //        };


        //    //#endregion
        //    #region Reception 
        //    var Reception = new List<Reception>
        //            {
        //                new Reception
        //                {
        //                    Name = "Reception 1"
        //                },
        //                new Reception
        //                {
        //                    Name = "Reception 2"
        //                },
        //                new Reception
        //                {
        //                    Name = "Reception 3"
        //                },
        //                new Reception
        //                {
        //                    Name = "Reception 4"
        //                },
        //                new Reception
        //                {
        //                    Name = "Reception 5"
        //                },
        //            };

        //    #endregion
        //    #region Specialization
        //    var Specialization = new List<Specialization>
        //            {
        //                new Specialization
        //                {
        //                    Name = "Cardiology"
        //                },
        //                new Specialization
        //                {
        //                    Name = "Dermatology"
        //                },
        //                new Specialization
        //                {
        //                    Name = "Orthopedics"
        //                },
        //                new Specialization
        //                {
        //                    Name = "Pediatrics"
        //                },
        //                new Specialization
        //                {
        //                    Name = "Ophthalmology"
        //                },
        //            };
        //    #endregion
        //    #region VisitCount
        //    var VisitCount = new List<VisitCount>
        //            {
        //                new VisitCount
        //                {
        //                    Date = new DateTime(2023, 5, 10),
        //                    LimitOfPatients = 30,
        //                    ActualNoOfPatients = 25
        //                },
        //                new VisitCount
        //                {
        //                    Date = new DateTime(2023, 5, 11),
        //                    LimitOfPatients = 25,
        //                    ActualNoOfPatients = 20
        //                },
        //                new VisitCount
        //                {
        //                    Date = new DateTime(2023, 5, 12),
        //                    LimitOfPatients = 35,
        //                    ActualNoOfPatients = 28
        //                },
        //                new VisitCount
        //                {
        //                    Date = new DateTime(2023, 5, 13),
        //                    LimitOfPatients = 40,
        //                    ActualNoOfPatients = 38
        //                },
        //                new VisitCount
        //                {
        //                    Date = new DateTime(2023, 5, 14),
        //                    LimitOfPatients = 30,
        //                    ActualNoOfPatients = 29
        //                },
        //            };
        //    #endregion
        //    //#region WeekSchedule
        //    //var WeekSchedule = new List<WeekSchedule>
        //    //        {
        //    //            new WeekSchedule
        //    //            {
        //    //                DayOfWeek = "Monday",
        //    //                StartTime = new DateTime(2023, 5, 15, 9, 0, 0),
        //    //                EndTime = new DateTime(2023, 5, 15, 17, 0, 0),
        //    //                IsAvailable = true,

        //    //            },
        //    //            new WeekSchedule
        //    //            {
        //    //                DayOfWeek = "Tuesday",
        //    //                StartTime = new DateTime(2023, 5, 16, 9, 0, 0),
        //    //                EndTime = new DateTime(2023, 5, 16, 17, 0, 0),
        //    //                IsAvailable = true
        //    //            },
        //    //            new WeekSchedule
        //    //            {
        //    //                DayOfWeek = "Wednesday",
        //    //                StartTime = new DateTime(2023, 5, 17, 9, 0, 0),
        //    //                EndTime = new DateTime(2023, 5, 17, 17, 0, 0),
        //    //                IsAvailable = false
        //    //            },
        //    //            new WeekSchedule
        //    //            {
        //    //                DayOfWeek = "Thursday",
        //    //                StartTime = new DateTime(2023, 5, 18, 9, 0, 0),
        //    //                EndTime = new DateTime(2023, 5, 18, 17, 0, 0),
        //    //                IsAvailable = true
        //    //            },
        //    //            new WeekSchedule
        //    //            {
        //    //                DayOfWeek = "Friday",
        //    //                StartTime = new DateTime(2023, 5, 19, 9, 0, 0),
        //    //                EndTime = new DateTime(2023, 5, 19, 17, 0, 0),
        //    //                IsAvailable = true
        //    //            },
        //    //        };
        //    //#endregion

        //    builder.Entity<Admin>().HasData(Admin);
        //    builder.Entity<Doctor>().HasData(Doctor);
        //    builder.Entity<MedicaHistory>().HasData(MedicaHistory);
        //    builder.Entity<Patient>().HasData(Patient);
        //    builder.Entity<PatientVisit>().HasData(PatientVisit);
        //    //builder.Entity<PatientVisitsWithDoctor>().HasData(PatientVisitsWithDoctor);
        //    builder.Entity<Reception>().HasData(Reception);
        //    builder.Entity<Specialization>().HasData(Specialization);
        //    builder.Entity<VisitCount>().HasData(VisitCount);
        //   // builder.Entity<WeekSchedule>().HasData(WeekSchedule);

        //}

    }
}
