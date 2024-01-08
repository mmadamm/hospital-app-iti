export interface GetPatientVisitsChildDto {
  id: number;
  review: string | null;
  rate: number | null;
  doctorId: string;
  dateOfVisit: string;
  comments: string | null;
  symptoms: string | null;
  visitStatus: string | null;
  arrivalTime: string;
  visitStartTime: string;
  visitEndTime: string;
  prescription: string | null;
}
