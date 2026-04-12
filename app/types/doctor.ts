// types/doctor.ts
export interface DoctorProfile {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'doctor';
  specialization: string;
  licenseNumber: string;
  experience: number;
  qualifications: string[];
  consultationFee: number;
  languages: string[];
  bio: string;
  address: string;
  profilePicture?: string;
  availability: {
    monday?: AvailabilitySlot[];
    tuesday?: AvailabilitySlot[];
    wednesday?: AvailabilitySlot[];
    thursday?: AvailabilitySlot[];
    friday?: AvailabilitySlot[];
    saturday?: AvailabilitySlot[];
    sunday?: AvailabilitySlot[];
  };
  designation?: string;
  age?: number;
  rating: number;
  totalReviews: number;
  createdAt: string;
  updatedAt: string;
}

export interface AvailabilitySlot {
  start: string;
  end: string;
}

export interface UpdateDoctorDto {
  fullName?: string;
  phone?: string;
  specialization?: string;
  licenseNumber?: string;
  experience?: number;
  qualifications?: string[];
  consultationFee?: number;
  languages?: string[];
  bio?: string;
  address?: string;
  profilePicture?: string;
  availability?: Partial<Record<keyof DoctorProfile['availability'], AvailabilitySlot[]>>;
  designation?: string;
  age?: number;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

// API Response Types
export interface QualificationsResponse {
  qualifications: string[];
}

export interface ConsultationFeeResponse {
  consultationFee: number;
}

export interface AvailabilityResponse {
  day: string;
  slots: AvailabilitySlot[];
}

export interface PasswordChangeResponse {
  message: string;
}

// Appointment Types (if needed)
export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  appointmentDate: string;
  timeSlot: string;
  reason: string;
  urgent: boolean;
  status: string;
  createdAt: string;
}

export interface AppointmentsResponse {
  appointments: Appointment[];
}