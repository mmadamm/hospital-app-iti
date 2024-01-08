export interface AddPatientVisitDto {
    dateOfVisit: string;
    doctorId: string | null;
    patientId: string | null;
    weekSchedule?: number | null;
}