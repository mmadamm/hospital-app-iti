import { ChildDoctorOfSpecializationDto } from "./ChildDoctorOfSpecializationDto";


export interface GetDoctorsBySpecializationDto {
    id: number;
    name: string | null;
    childDoctorOfSpecializations: ChildDoctorOfSpecializationDto[] | null;
}