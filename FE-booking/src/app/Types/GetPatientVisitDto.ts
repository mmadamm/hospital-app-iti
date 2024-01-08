import { GetPatientVisitsChildDto } from "./GetPatientVisitsChildDto";

export default interface GetPatientVisitDto {
  name: string | null;
  patientVisits: GetPatientVisitsChildDto[] | null;
}

