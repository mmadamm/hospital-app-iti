export interface GetPatientVisitsChildDTO {
  id: number;
  review: string | null;
  rate: number | null;
  patientId: string | null;
  doctorId: string | null;
  dateOfVisit: string;
  comments: string | null;
  symptoms: string | null;
  visitStatus: string | null;
  arrivalTime: string;
  visitStartTime: string;
  visitEndTime: string;
  prescription: string | null;
}
