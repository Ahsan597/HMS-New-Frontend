// types/patient.ts
export interface PatientProfile {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'patient';
  dateOfBirth: string;
  bloodGroup: string;
  emergencyContact: string;
  allergies: string[];
  chronicConditions: string[];
  currentMedications?: string[];
  insuranceInfo: {
    provider: string;
    policyNumber: string;
    expiryDate: string;
  };
  emergencyContacts: {
    name: string;
    relationship: string;
    phone: string;
  }[];
  address: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdatePatientDto {
  fullName?: string;
  phone?: string;
  dateOfBirth?: string;
  bloodGroup?: string;
  emergencyContact?: string;
  allergies?: string[];
  chronicConditions?: string[];
  currentMedications?: string[];
  insuranceInfo?: {
    provider: string;
    policyNumber: string;
    expiryDate: string;
  };
  emergencyContacts?: {
    name: string;
    relationship: string;
    phone: string;
  }[];
  address?: string;
  profilePicture?: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}