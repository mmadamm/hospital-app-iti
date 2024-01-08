export interface GetRateAndReviewDto {
    id: number;
    dateOfVisit: string;
    review: string | null;
    rate: number | null;
    doctorId: string | null;
    patientId: string | null;
    patientName: string | null;
    patientPhoneNumber: string | null;
}