export interface UpdatePatientVisitDto {
  id: number;
  doctorId: string | null;
  patientId: string | null;
  comments: string | null;
  symptoms: string | null;
  prescription: string | null;
}
