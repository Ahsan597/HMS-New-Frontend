import { apiService } from './api.service';
import type {
  DoctorProfile,
  UpdateDoctorDto,
  ChangePasswordDto,
  QualificationsResponse,
  ConsultationFeeResponse,
  AvailabilityResponse,
  PasswordChangeResponse,
  AppointmentsResponse,
  Appointment
} from '@/types/doctor';

class DoctorService {
  // ==================== PROFILE METHODS ====================
  
  async getProfile(): Promise<DoctorProfile> {
    try {
      const response = await apiService.get<DoctorProfile>('/doctors/profile');
      return response;
    } catch (error) {
      console.error('Failed to fetch doctor profile:', error);
      throw error;
    }
  }

  async updateProfile(data: UpdateDoctorDto): Promise<DoctorProfile> {
    try {
      const response = await apiService.put<DoctorProfile>('/doctors/profile', data);
      return response;
    } catch (error) {
      console.error('Failed to update doctor profile:', error);
      throw error;
    }
  }

  // ==================== APPOINTMENT METHODS ====================
  
  async getDoctorAppointments(doctorId: string): Promise<AppointmentsResponse> {
    try {
      const response = await apiService.get<any[]>(`/appointments?doctorId=${doctorId}`);
      
      const transformedAppointments: Appointment[] = response.map((appointment: any) => ({
        id: appointment._id,
        patientId: appointment.patientId?._id || '',
        patientName: appointment.patientId?.fullName || 'Unknown Patient',
        doctorId: appointment.doctorId?._id || '',
        appointmentDate: appointment.appointmentDate,
        timeSlot: appointment.timeSlot,
        reason: appointment.reason,
        urgent: appointment.urgent,
        status: appointment.status,
        createdAt: appointment.createdAt
      }));
      
      return { appointments: transformedAppointments };
    } catch (error) {
      console.error('Failed to fetch doctor appointments:', error);
      return { appointments: [] };
    }
  }

  // ==================== SCHEDULE METHODS ====================
  
  async getSchedule(): Promise<DoctorProfile['availability']> {
    try {
      const response = await apiService.get<{ availability: DoctorProfile['availability'] }>('/doctors/schedule');
      return response.availability;
    } catch (error) {
      console.error('Failed to fetch schedule:', error);
      throw error;
    }
  }

  async updateSchedule(schedule: DoctorProfile['availability']): Promise<DoctorProfile['availability']> {
    try {
      const response = await apiService.put<{ availability: DoctorProfile['availability'] }>('/doctors/schedule', schedule);
      return response.availability;
    } catch (error) {
      console.error('Failed to update schedule:', error);
      throw error;
    }
  }

  // ==================== QUALIFICATIONS METHODS ====================

  async getQualifications(): Promise<string[]> {
    try {
      const response = await apiService.get<QualificationsResponse>('/doctors/qualifications');
      return response.qualifications;
    } catch (error) {
      console.error('Failed to fetch qualifications:', error);
      throw error;
    }
  }

  async addQualification(qualification: string): Promise<string[]> {
    try {
      const response = await apiService.post<QualificationsResponse>('/doctors/qualifications', { qualification });
      return response.qualifications;
    } catch (error) {
      console.error('Failed to add qualification:', error);
      throw error;
    }
  }

  async removeQualification(qualification: string): Promise<string[]> {
    try {
      const response = await apiService.delete<QualificationsResponse>(`/doctors/qualifications/${encodeURIComponent(qualification)}`);
      return response.qualifications;
    } catch (error) {
      console.error('Failed to remove qualification:', error);
      throw error;
    }
  }

  // ==================== CONSULTATION FEE METHODS ====================

  async getConsultationFee(): Promise<number> {
    try {
      const response = await apiService.get<ConsultationFeeResponse>('/doctors/consultation-fee');
      return response.consultationFee;
    } catch (error) {
      console.error('Failed to fetch consultation fee:', error);
      throw error;
    }
  }

  async updateConsultationFee(fee: number): Promise<number> {
    try {
      const response = await apiService.put<ConsultationFeeResponse>('/doctors/consultation-fee', { fee });
      return response.consultationFee;
    } catch (error) {
      console.error('Failed to update consultation fee:', error);
      throw error;
    }
  }

  // ==================== PASSWORD METHODS ====================

  async changePassword(data: ChangePasswordDto): Promise<PasswordChangeResponse> {
    try {
      const response = await apiService.patch<PasswordChangeResponse>('/auth/change-password', data);
      return response;
    } catch (error) {
      console.error('Failed to change password:', error);
      throw error;
    }
  }

  // ==================== AVAILABILITY METHODS ====================

  async getTodayAvailability(): Promise<AvailabilityResponse> {
    try {
      const response = await apiService.get<AvailabilityResponse>('/doctors/availability/today');
      return response;
    } catch (error) {
      console.error('Failed to fetch today\'s availability:', error);
      throw error;
    }
  }

  async getDayAvailability(day: string): Promise<AvailabilityResponse> {
    try {
      const response = await apiService.get<AvailabilityResponse>(`/doctors/availability/${day}`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch ${day} availability:`, error);
      throw error;
    }
  }

  // ==================== EARNINGS METHODS ====================
  
  async getEarnings(): Promise<any> {
    try {
      const response = await apiService.get('/doctors/earnings');
      return response;
    } catch (error) {
      console.error('Failed to fetch earnings:', error);
      throw error;
    }
  }

  async getEarningsSummary(): Promise<any> {
    try {
      const response = await apiService.get('/doctors/earnings/summary');
      return response;
    } catch (error) {
      console.error('Failed to fetch earnings summary:', error);
      throw error;
    }
  }

  // ==================== PUBLIC METHODS ====================
  
  async getAllDoctors(filters?: { specialization?: string; experience?: number }): Promise<DoctorProfile[]> {
    try {
      let url = '/doctors';
      if (filters) {
        const params = new URLSearchParams();
        if (filters.specialization) params.append('specialization', filters.specialization);
        if (filters.experience) params.append('experience', filters.experience.toString());
        url += `?${params.toString()}`;
      }
      const response = await apiService.get<DoctorProfile[]>(url);
      return response;
    } catch (error) {
      console.error('Failed to fetch all doctors:', error);
      throw error;
    }
  }

  async getDoctorById(doctorId: string): Promise<DoctorProfile> {
    try {
      const response = await apiService.get<DoctorProfile>(`/doctors/${doctorId}/public`);
      return response;
    } catch (error) {
      console.error('Failed to fetch doctor by ID:', error);
      throw error;
    }
  }
}

export const doctorService = new DoctorService();