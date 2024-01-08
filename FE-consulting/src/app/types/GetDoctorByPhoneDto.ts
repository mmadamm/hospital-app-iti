import { WeekScheduleForDoctorsDto } from "./WeekScheduleForDoctorsDto";


export interface GetDoctorByPhoneDto {
    id?: string;
    name?: string;
    title?: string ;
    dateOfBirth?: string;
    description?: string ;
    phoneNumber: string | null;
    salary? : number
    specializationName: string;
    weekSchadual: WeekScheduleForDoctorsDto[] | null;
    imageFileName?: string ;
    imageStoredFileName?: string;
    imageContentType?: string ;
    imageUrl?: string ;
}