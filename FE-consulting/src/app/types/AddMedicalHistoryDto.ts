export interface AddMedicalHistoryDto {

    patientId: string | null;
    martialStatus: boolean;
    pregnancy: boolean ;
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