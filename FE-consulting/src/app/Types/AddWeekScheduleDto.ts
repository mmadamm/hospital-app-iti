export interface AddWeekScheduleDto {
    id: number;
    dayOfWeek: number;
    limitOfPatients: number;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
    doctorId: string;
}