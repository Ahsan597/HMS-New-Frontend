import { apiService } from './api.service';

interface Doctor {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  specialization?: string;
  qualifications?: string[];
  experience?: number;
  availability?: {
    days: string[];
    timeSlots: string[];
  };
  doctorProfile: any;
}

interface DoctorResponse {
  message: string;
  doctor: Doctor;
}

interface DoctorsResponse {
  doctors: Doctor[];
  total?: number;
}

interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientPhone?: string;
  doctorId: string;
  appointmentDate: string;
  timeSlot: string;
  reason: string;
  urgent: boolean;
  status: string;
  createdAt: string;
}

interface AppointmentsResponse {
  appointments: Appointment[];
  total?: number;
}

interface UpdateAvailabilityData {
  days?: string[];
  timeSlots?: string[];
}





class DoctorService {
  // Profile related APIs
  async getDoctorProfile(doctorId: string): Promise<DoctorResponse> {
    try {
      const response = await apiService.get<DoctorResponse>(`/doctors/${doctorId}`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateDoctorProfile(doctorId: string, profileData: Partial<Doctor>): Promise<DoctorResponse> {
    try {
      const response = await apiService.put<DoctorResponse>(`/doctors/${doctorId}`, profileData);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Appointment related APIs for doctors
  async getDoctorAppointments(doctorId: string, status?: string): Promise<AppointmentsResponse> {
    try {
      let url = `/appointments/doctor/${doctorId}`;
      if (status) {
        url += `?status=${status}`;
      }
      const response = await apiService.get<AppointmentsResponse>(url);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getTodayAppointments(doctorId: string): Promise<AppointmentsResponse> {
    try {
      const today = new Date().toISOString().split('T')[0];
      const response = await apiService.get<AppointmentsResponse>(
        `/appointments/doctor/${doctorId}?date=${today}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateAppointmentStatus(appointmentId: string, status: string): Promise<{ message: string }> {
    try {
      const response = await apiService.patch<{ message: string }>(
        `/appointments/${appointmentId}/status`,
        { status }
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Availability management
  async getAvailability(doctorId: string): Promise<{ availability: any }> {
    try {
      const response = await apiService.get<{ availability: any }>(
        `/doctors/${doctorId}/availability`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async updateAvailability(doctorId: string, availabilityData: UpdateAvailabilityData): Promise<{ message: string }> {
    try {
      const response = await apiService.put<{ message: string }>(
        `/doctors/${doctorId}/availability`,
        availabilityData
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Statistics and dashboard data
  async getDashboardStats(doctorId: string): Promise<{
    totalAppointments: number;
    pendingAppointments: number;
    confirmedAppointments: number;
    completedAppointments: number;
    cancelledAppointments: number;
    urgentAppointments: number;
  }> {
    try {
      const response = await apiService.get<any>(`/doctors/${doctorId}/stats`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Patient history (for doctors to view patient history)
  async getPatientHistory(patientId: string): Promise<{
    patient: any;
    appointments: Appointment[];
  }> {
    try {
      const response = await apiService.get<any>(`/patients/${patientId}/history`);
      return response;
    } catch (error) {
      throw error;
    }
  }

  // Get all doctors (with optional filters)
  async getAllDoctors(filters?: {
    specialization?: string;
    search?: string;
  }): Promise<DoctorsResponse> {
    try {
      let url = '/users?role=doctor';
      if (filters?.specialization) {
        url += `&specialization=${filters.specialization}`;
      }
      if (filters?.search) {
        url += `&search=${filters.search}`;
      }
      
      const response = await apiService.get<any[]>(url);
      
      // Transform the response
      const doctors = response.map((doctor: any) => ({
        id: doctor._id,
        fullName: doctor.fullName,
        email: doctor.email,
        phone: doctor.phone,
        role: doctor.role,
        specialization: doctor.doctorProfile?.specialty || 'General Physician',
        qualifications: doctor.doctorProfile?.qualifications || [],
        experience: doctor.doctorProfile?.experience || 0,
        doctorProfile: doctor.doctorProfile
      }));
      
      return { doctors };
    } catch (error) {
      throw error;
    }
  }

  // Get doctor by ID with full details
  async getDoctorById(doctorId: string): Promise<Doctor> {
    try {
      const response = await apiService.get<any>(`/users/${doctorId}`);
      
      return {
        id: response._id,
        fullName: response.fullName,
        email: response.email,
        phone: response.phone,
        role: response.role,
        specialization: response.doctorProfile?.specialty || 'General Physician',
        qualifications: response.doctorProfile?.qualifications || [],
        experience: response.doctorProfile?.experience || 0,
        availability: response.doctorProfile?.availability,
        doctorProfile: response.doctorProfile
      };
    } catch (error) {
      throw error;
    }
  }
}

// Create and export a single instance
export const doctorService = new DoctorService();


