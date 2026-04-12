import { apiService } from './api.service';
import { PatientProfile, UpdatePatientDto,ChangePasswordDto } from '../types/patient';

interface Appointment {
  id?: string;
  patientId: string;
  doctorId: string;
  appointmentDate: string;
  timeSlot: string;
  reason: string;
  urgent: boolean;
  status?: string;
  doctorName?: string;
  doctorSpecialty?: string;
  createdAt?: string;
}

interface AppointmentResponse {
  message: string;
  appointment: Appointment;
}

interface AppointmentsResponse {
  appointments: Appointment[];
  total?: number;
}

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experience?: number;
  qualifications?: string[];
  availability?: {
    days: string[];
    timeSlots: string[];
  };
}

interface DoctorsResponse {
  doctors: Doctor[];
}

class PatientService {

  async getProfile(): Promise<PatientProfile> {
    try {
      const response = await apiService.get<PatientProfile>('/patients/profile');
      return response;
    } catch (error) {
      console.error('Failed to fetch patient profile:', error);
      throw error;
    }
  }

  async updateProfile(data: UpdatePatientDto): Promise<PatientProfile> {
    try {
      const response = await apiService.put<PatientProfile>('/patients/profile', data);
      return response;
    } catch (error) {
      console.error('Failed to update patient profile:', error);
      throw error;
    }
  }

  // ==================== PASSWORD METHODS ====================

  async changePassword(data: ChangePasswordDto): Promise<{ message: string }> {
    try {
      const response = await apiService.patch<{ message: string }>('/auth/change-password', data);
      return response;
    } catch (error) {
      console.error('Failed to change password:', error);
      throw error;
    }
  }



  // Appointment related APIs
  async createAppointment(appointmentData: Omit<Appointment, 'id' | 'status' | 'createdAt' | 'doctorName' | 'doctorSpecialty'>): Promise<AppointmentResponse> {
    try {
      const response = await apiService.post<AppointmentResponse>('/appointments', appointmentData);
      return response;
    } catch (error) {
      throw error;
    }
  }

async getMyAppointments(patientId: string): Promise<AppointmentsResponse> {
  try {
    // Using the correct endpoint format: appointments?patient_id=patientId
    const response = await apiService.get<any[]>(`/appointments?patient_id=${patientId}`);
    
    console.log('Raw appointments response:', response);
    
    // Check if response is an array
    if (!Array.isArray(response)) {
      console.error('Response is not an array:', response);
      return { appointments: [] };
    }
    
    // Filter appointments for the current patient and transform them
    const transformedAppointments = response
      .filter((appointment: any) => {
        // Only show appointments that belong to the current patient
        return appointment.patientId && 
               appointment.patientId._id === patientId;
      })
      .map((appointment: any) => ({
        id: appointment._id,
        doctorId: appointment.doctorId?._id || '',
        doctorName: appointment.doctorId?.fullName || 'Unknown Doctor',
        doctorSpecialty: 'General Physician', // Default since specialty might not be in response
        patientId: appointment.patientId?._id || '',
        patientName: appointment.patientId?.fullName || 'Unknown Patient',
        appointmentDate: appointment.appointmentDate,
        timeSlot: appointment.timeSlot,
        reason: appointment.reason,
        urgent: appointment.urgent,
        status: appointment.status,
        createdAt: appointment.createdAt
      }));
    
    console.log('Transformed appointments:', transformedAppointments);
    console.log('Number of appointments found:', transformedAppointments.length);
    
    return { appointments: transformedAppointments };
  } catch (error) {
    console.error('Failed to fetch appointments:', error);
    // Return empty array instead of throwing error to prevent UI from breaking
    return { appointments: [] };
  }
}

async getAppointmentById(id: string): Promise<AppointmentResponse> {
  try {
    // Using the correct endpoint format: appointments/{id}
    const response = await apiService.get<any>(`/appointments/${id}`);
    
    console.log('Raw appointment details response:', response);
    
    // Transform the response
    const transformedAppointment = {
      id: response._id,
      doctorId: response.doctorId._id,
      doctorName: response.doctorId.fullName,
      doctorSpecialty: 'General Physician',
      patientId: response.patientId._id,
      patientName: response.patientId.fullName,
      appointmentDate: response.appointmentDate,
      timeSlot: response.timeSlot,
      reason: response.reason,
      urgent: response.urgent,
      status: response.status,
      createdAt: response.createdAt
    };
    
    return { 
      message: 'Success', 
      appointment: transformedAppointment 
    };
  } catch (error) {
    console.error('Failed to fetch appointment details:', error);
    throw error;
  }
}

async updateAppointment(id: string, appointmentData: Partial<Appointment>): Promise<AppointmentResponse> {
  try {
    // Only send the fields that the API accepts
    const { doctorId, patientId, ...dataToSend } = appointmentData;
    
    console.log('Sending update data to API:', dataToSend);
    const response = await apiService.put<AppointmentResponse>(`/appointments/${id}`, dataToSend);
    return response;
  } catch (error) {
    console.error('Failed to update appointment:', error);
    throw error;
  }
}

async cancelAppointment(id: string): Promise<any> {
  try {
    // Using PUT to /appointments/cancel/{id} for soft delete
    const response = await apiService.put<any>(`/appointments/cancel/${id}`, {});
    return response;
  } catch (error) {
    console.error('Failed to cancel appointment:', error);
    throw error;
  }
}

async getAvailableDoctors(): Promise<any[]> {
  try {
    // Using the users endpoint with role=doctor filter
    const response = await apiService.get<any[]>('/users?role=doctor');
    
    console.log('Doctors API response:', response); // Add this for debugging
    
    // Transform the response to match your component's expected format
    const transformedDoctors = response.map((doctor: any) => ({
      id: doctor._id,
      name: doctor.fullName,
      specialty: doctor.doctorProfile?.specialty || 'General Physician'
    }));
    
    console.log('Transformed doctors:', transformedDoctors); // Add this for debugging
    
    return transformedDoctors;
  } catch (error) {
    console.error('Failed to fetch doctors:', error);
    throw error;
  }
}


}

// Create and export a single instance
export const patientService = new PatientService();


