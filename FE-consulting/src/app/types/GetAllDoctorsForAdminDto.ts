export interface GetAllDoctorsForAdminDto {
    id: string;
    name: string;
    title: string | null;
    description: string | null;
    salary: number;
    dateOfBirth: string ;
    assistantID: string | null;
    assistantName: string | null;
    assistantPhoneNumber: string | null;
    assistantDateOfBirth: string | null;
    status: string | null;
    
}