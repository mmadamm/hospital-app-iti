import { GetPatientVisitsChildDTO } from "./GetPatientVisitChildDto";

export interface GetPatientVisitDto {
    patientId: string | null;
    name: string | null;
    patientVisits: GetPatientVisitsChildDTO[] | null;
}