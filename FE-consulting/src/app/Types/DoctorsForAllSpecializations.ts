import { WeekScheduleForDoctorsDto } from "./WeekScheduleForDoctorsDto";

export interface DoctorsForAllSpecializations {
    id: string;
    name: string;
    status? : boolean
    weekSchadual?: WeekScheduleForDoctorsDto[] | null;

}