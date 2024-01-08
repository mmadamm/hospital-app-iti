export interface GetPatientByPhoneDTO {
  id: string;
  name: string | null;
  gender: string | null;
  dateOfBirth: string;
  phoneNumber: string | null;
}
