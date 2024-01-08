import { WeekScheduleForDoctorsDto } from "./WeekScheduleForDoctorsDto";


export interface GetDoctorByIDForAdminDto {
    id: string | null;
    name: string;
    title: string ;
    description: string ;
    phoneNumber: string ;
    salary: number;
    dateOfBirth: string;
    specializationName: string;
    weekSchadual: WeekScheduleForDoctorsDto[] ;
    imageFileName: string ;
    imageStoredFileName: string ;
    imageContentType: string ;
    imageUrl: string ;
    status : boolean
}