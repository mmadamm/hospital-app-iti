export  interface RegisterDoctorDto {
    
    name: string ;
    title?: string ;
    description?: string;
    specializationId: number;
    salary?: number;
    phoneNumber: string ;
    dateOfBirth?: string;
    assistantID?: string ;
    assistantName?: string ;
    assistantPhoneNumber?: string ;
    assistantDateOfBirth: string;
    password: string;
}