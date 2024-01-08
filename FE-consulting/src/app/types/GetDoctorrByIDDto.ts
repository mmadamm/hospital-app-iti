import { WeekScheduleForDoctorsDto } from "./WeekScheduleForDoctorsDto";


export interface GetDoctorByIDDto {
    id: string;
    name: string;
    title: string | null;
    description: string | null;
    specializationName: string |null;
    weekSchadual?: WeekScheduleForDoctorsDto[] | null;
    imageFileName? : string
    imageStoredFileName? :string  
    imageContentType? :string 
    imageUrl? : string 
    status ? :boolean
}