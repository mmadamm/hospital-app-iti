import { DoctorsForAllSpecializations } from "./DoctorsForAllSpecializations";

export interface GetAllSpecializationsDto {
    id: number;
    name: string | null;
    
    doctorsForAllSpecializations: DoctorsForAllSpecializations[] | null;
}