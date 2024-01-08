export interface GetMedicalHistoryByPhoneDto {
    martialStatus: boolean;
    pregnancy: boolean | null;
    bloodGroup: string | null;
    previousSurgeries: string | null;
    medication: string | null;
    smoker: boolean;
    diabetes: boolean;
    highBloodPressure: boolean;
    lowBloodPressure: boolean;
    asthma: boolean;
    hepatitis: string | null;
    heartDisease: boolean;
    anxityOrPanicDisorder: boolean;
    depression: boolean;
    allergies: boolean;
    other: string | null;
}