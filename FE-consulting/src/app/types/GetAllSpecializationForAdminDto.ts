import { GetAllDoctorsForAdminDto } from "./GetAllDoctorsForAdminDto";

export interface GetAllSpecializationForAdminDto {
    id: number;
    name: string | null;
    doctorsForAdmin: GetAllDoctorsForAdminDto[] | null;
}