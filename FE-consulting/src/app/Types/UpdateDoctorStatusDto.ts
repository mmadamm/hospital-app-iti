export interface UpdateDoctorStatusDto {
    id?: string;
    name?: string;
    salary?: number;
    title?: string | null;
    description?: string | null;
    phoneNumber?: string | null;
    dateOfBirth?: string;
    specializationName?: string;
    // assistantID?: string | null;
    // assistantName?: string | null;
    // assistantPhoneNumber?: string | null;
    // assistantDateOfBirth?: string;
    status?: boolean;
}