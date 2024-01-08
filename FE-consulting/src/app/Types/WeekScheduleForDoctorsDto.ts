export interface WeekScheduleForDoctorsDto {
    id : number ;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
    limitOfPatients : number
    doctorId : string
}