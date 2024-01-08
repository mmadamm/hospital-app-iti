using graduationProject.DAL;
using graduationProject.DAL.Data.Models;
using GraduationProject.BL.Dtos;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace GraduationProject.BL
{
    public class PatientManager : IPatientManager
    {
        // private readonly PatientRepo _patientRepo;
        private readonly IUnitOfWork _unitOfWork;
        public PatientManager(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        #region GetPatientByPhone
        public GetPatientByPhoneDTO? getPatientByPhoneDTO(string phoneNumber)
        {
            Patient? patient = _unitOfWork.patientRepo.GetPatientByPhoneNumber(phoneNumber);

            if (patient == null) { return null; }
            return new GetPatientByPhoneDTO
            {
                Id = patient.Id,
                Name = patient.Name,
                PhoneNumber = phoneNumber,
                Gender = patient.Gender,
                DateOfBirth = patient.DateOfBirth,
            };
        }
        #endregion

        #region GetMedicalHistory
        public GetMedicalHistoryByPhoneDto? GetMedicalHistoryByPhoneNumber(string phoneNumber)
        {
            MedicaHistory? medicalHistory = _unitOfWork.patientRepo.GetMedicaHistoryByPhoneNumber(phoneNumber);
            if (medicalHistory == null) { return null; }

            return new GetMedicalHistoryByPhoneDto
            {
                MartialStatus = medicalHistory.MartialStatus,
                pregnancy = medicalHistory.pregnancy,
                BloodGroup = medicalHistory.BloodGroup,
                previousSurgeries = medicalHistory.previousSurgeries,
                Medication = medicalHistory.Medication,
                Smoker = medicalHistory.Smoker,
                Diabetes = medicalHistory.Diabetes,
                HighBloodPressure = medicalHistory.HighBloodPressure,
                LowBloodPressure = medicalHistory.LowBloodPressure,
                Asthma = medicalHistory.Asthma,
                Hepatitis = medicalHistory.Hepatitis,
                HeartDisease = medicalHistory.HeartDisease,
                AnxityOrPanicDisorder = medicalHistory.AnxityOrPanicDisorder,
                Depression = medicalHistory.Depression,
                Allergies = medicalHistory.Allergies,
                Other = medicalHistory.Other,
                Id = medicalHistory.Id,
                PatientId = medicalHistory.PatientId
            };

        }
        #endregion


        #region GetPatientVisitsByPhone
        public GetPatientVisitDto? GetPatientVisitsByPhoneNumber(string phoneNumber)
        {
            /*                List<PatientVisit>? patientVisit = _unitOfWork.patientRepo.GetPatientVisitsByPhoneNumber(phoneNumber).ToList();
            */               /* if (patientVisit = ) { return ; }*/

            Patient? patient = _unitOfWork.patientRepo.GetPatientVisitsByPhoneNumber(phoneNumber);
            if (patient == null) { return null; }

            return new GetPatientVisitDto
            {
                PatientId = patient.Id,
                Name = patient.Name,

                PatientVisits = patient.PatientVisits.Select(p => new GetPatientVisitsChildDTO
                {
                 
                    Id = p.Id,
                    Rate = p.Rate,
                    Review = p.Review,
                    DoctorId = p.DoctorId,
                    DateOfVisit = p.DateOfVisit.ToShortDateString(),
                    Comments = p.Comments,
                    Symptoms = p.Symptoms,
                    VisitStatus = p.VisitStatus,
                    ArrivalTime = p.ArrivalTime.ToShortTimeString(),
                    VisitStartTime = p.VisitStartTime.ToShortDateString(),
                    VisitEndTime = p.VisitEndTime.ToShortDateString(),
                    Prescription = p.Prescription,
                    DoctorName = p.Doctor.Name


                }).ToList()
            };
        }

        #endregion
        #region Review and Rate
        public bool ReviewAndRate(VisitReviewAndRateDto dto)
        {
            
            PatientVisit? dbVisit = _unitOfWork.visitReviewAndRateRepo.GetById(dto.Id);
            if (dbVisit == null) { return false;}
            dbVisit.Review = dto.Review;
            dbVisit.Rate = dto.Rate;
            _unitOfWork.visitReviewAndRateRepo.Update(dbVisit);
            _unitOfWork.SaveChanges();
            return true;
        }
        #endregion

        #region AddPatientVisit
        public void AddPatientVisit(AddPatientVisitDto addPatientVisitDto)
        {
            PatientVisit pv = new PatientVisit
            {
                PatientId = addPatientVisitDto.PatientId,
                DateOfVisit = DateTime.Parse(addPatientVisitDto.DateOfVisit),
                DoctorId = addPatientVisitDto.DoctorId,
            };
            _unitOfWork.patientVisitRepo.AddPatientVisit(pv);

            VisitCount visitCount = _unitOfWork.visitCountRepo.GetCount(pv.DateOfVisit , pv.DoctorId);
            Doctor? DoctorWeekSchedule = _unitOfWork.weekScheduleRepo.GetAllWeekSchedule(pv.DoctorId);

            DayOfWeek Day = pv.DateOfVisit.DayOfWeek;
            WeekSchedule? weekSchedule = _unitOfWork.visitCountRepo.GetWeekSchedule(Day, pv.DoctorId);
            
            if (visitCount == null)
            {
                VisitCount AddVisitCount = new VisitCount
                {
                    DoctorId = addPatientVisitDto.DoctorId,
                    Date = DateTime.Parse(addPatientVisitDto.DateOfVisit),
                    LimitOfPatients = weekSchedule.LimitOfPatients,
                    WeekScheduleId = weekSchedule.Id,
                    ActualNoOfPatients = 1,
                };
                _unitOfWork.visitCountRepo.AddOrUpdateVisitCount(AddVisitCount);
            }
            else
            {
                visitCount.ActualNoOfPatients++;
                _unitOfWork.visitCountRepo.AddOrUpdateVisitCount(visitCount);
            }
           
            _unitOfWork.SaveChanges();

        }
        #endregion

        #region DeletePatientVisit
        public void DeletePatientVisit(int? id)
        {
   

            PatientVisit patientVisit = _unitOfWork.patientVisitRepo.GetVisitById(id);

            if (patientVisit == null)
            {
                return;
            }

            VisitCount visitCount = _unitOfWork.visitCountRepo.GetCount(patientVisit.DateOfVisit, patientVisit.DoctorId);

            if (visitCount != null)
            {
                visitCount.ActualNoOfPatients--;

                _unitOfWork.visitCountRepo.AddOrUpdateVisitCount(visitCount);
            }

            _unitOfWork.patientVisitRepo.DeletePatientVisit(id);

            _unitOfWork.SaveChanges();
        }
        #endregion

    }

}

    
