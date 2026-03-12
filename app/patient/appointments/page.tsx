"use client";

import { useState, useEffect } from 'react';
import AppointmentForm from '@/app/components/AppointmentForm';
import AppointmentTable from '@/app/components/AppointmentTable';
import DashboardWrapper from '@/app/components/DashboardWrapper';
import { patientService } from '@/app/service/patient.service';
import { authService } from '@/app/service/auth.service';
import toast from 'react-hot-toast';
import CancelDialog from '@/app/components/CancelAppointment';


export default function AppointmentOverview() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<any>(null);
  const [viewingAppointment, setViewingAppointment] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
const [appointmentToCancel, setAppointmentToCancel] = useState<any>(null);
  const currentUser = authService.getCurrentUser();
  const patientId = currentUser?.id;

  useEffect(() => {
    fetchDoctors();
    if (patientId) {
      fetchAppointments();
    }
  }, [patientId]);



  const fetchDoctors = async () => {
  try {
    console.log('Fetching doctors...');
    const doctorsList = await patientService.getAvailableDoctors();
    console.log('Doctors received in component:', doctorsList);
    
    if (doctorsList && doctorsList.length > 0) {
      setDoctors(doctorsList);
      console.log('Doctors state updated:', doctorsList.length, 'doctors');
    } else {
      console.log('No doctors received from API');
      setDoctors([]);
    }
  } catch (err) {
    console.error('Failed to fetch doctors:', err);
    setError('Failed to load doctors');
    toast.error('Failed to load doctors');
  }
};

const fetchAppointments = async () => {
  try {
    setLoading(true);
    console.log('Fetching appointments for patient:', patientId);
    const response = await patientService.getMyAppointments(patientId);
    console.log('Appointments response:', response);
    
    if (response && response.appointments) {
      setAppointments(response.appointments);
      console.log('Appointments set:', response.appointments.length);
      if (response.appointments.length === 0) {
        toast.success('No appointments found'); // Optional: show info message
      }
    } else {
      console.log('No appointments in response');
      setAppointments([]);
    }
    setError(null);
  } catch (err) {
    console.error('Failed to fetch appointments:', err);
    setError('Failed to load appointments');
    toast.error('Failed to load appointments');
    setAppointments([]); // Set empty array on error
  } finally {
    setLoading(false);
  }
};

const handleAddAppointment = async (appointmentData: any) => {
  try {
    console.log('Adding appointment with data:', appointmentData);
    
    const newAppointment = {
      ...appointmentData,
      patientId: patientId,
      appointmentDate: new Date(appointmentData.appointmentDate).toISOString()
    };

    console.log('Sending to API:', newAppointment);
    const response = await patientService.createAppointment(newAppointment);
    console.log('Create appointment response:', response);
    
    toast.success('Appointment booked successfully!');
    await fetchAppointments();
    setIsFormOpen(false);
  } catch (err) {
    console.error('Failed to create appointment:', err);
    toast.error('Failed to create appointment. Please try again.');
  }
};

const handleEditAppointment = async (appointmentData: any) => {
  try {
    console.log('Editing appointment:', editingAppointment.id, 'with data:', appointmentData);
    
    // Only send the fields that the API accepts
    const updatedData = {
      appointmentDate: new Date(appointmentData.appointmentDate).toISOString(),
      timeSlot: appointmentData.timeSlot,
      reason: appointmentData.reason,
      urgent: appointmentData.urgent
      // status is optional - only include if you want to change it
      // status: appointmentData.status 
    };

    console.log('Sending to API:', updatedData);
    
    const response = await patientService.updateAppointment(editingAppointment.id, updatedData);
    console.log('Update appointment response:', response);
    
    toast.success('Appointment updated successfully!');
    await fetchAppointments();
    setEditingAppointment(null);
  } catch (err) {
    console.error('Failed to update appointment:', err);
    toast.error('Failed to update appointment. Please try again.');
  }
};

const handleDeleteAppointment = async (id: string) => {
  // Find the appointment to cancel
  const appointment = appointments.find(apt => apt.id === id);
  setAppointmentToCancel(appointment);
  setCancelDialogOpen(true);
};

const confirmCancelAppointment = async () => {
  if (!appointmentToCancel) return;
  
  try {
    console.log('Cancelling appointment:', appointmentToCancel.id);
    const response = await patientService.cancelAppointment(appointmentToCancel.id);
    console.log('Cancel appointment response:', response);
    
    toast.success('Appointment cancelled successfully!');
    await fetchAppointments();
    setCancelDialogOpen(false);
    setAppointmentToCancel(null);
  } catch (err) {
    console.error('Failed to cancel appointment:', err);
    toast.error('Failed to cancel appointment. Please try again.');
  }
};

const handleViewAppointment = (appointment: any) => {
  console.log('Viewing appointment details for:', appointment.id);
  // Just set the appointment directly from the table data
  setViewingAppointment(appointment);
};



  const getStatusBadge = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <DashboardWrapper requiredRole="patient">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-600">Loading appointments...</div>
        </div>
      </DashboardWrapper>
    );
  }


  return (
    <DashboardWrapper requiredRole="patient">
      <div className="space-y-6 w-full mt-6">
        {/* Header */}
        <div className="flex justify-between mt-4 items-center">
          <div>
            <h1 className="text-3xl font-bold mt-4">Appointment Overview</h1>
            <p className="text-gray-600 mt-1">Manage your medical appointments</p>
          </div>
          <button
            onClick={() => setIsFormOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Appointment</span>
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Table */}
        <div className="mt-4 w-full">
          <AppointmentTable
            appointments={appointments}
            onView={handleViewAppointment}
            onEdit={setEditingAppointment}
            onDelete={handleDeleteAppointment}
            getStatusBadge={getStatusBadge}
          />
        </div>


        {/* Appointment Form Dialog (Add/Edit) */}
        {(isFormOpen || editingAppointment) && (
          <AppointmentForm
            isOpen={isFormOpen || !!editingAppointment}
            onClose={() => {
              setIsFormOpen(false);
              setEditingAppointment(null);
            }}
            onSubmit={editingAppointment ? handleEditAppointment : handleAddAppointment}
            doctors={doctors}
            initialData={editingAppointment}
            title={editingAppointment ? 'Edit Appointment' : 'Book New Appointment'}
          />
        )}

        {/* View Appointment Dialog */}
        {viewingAppointment && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Appointment Details</h2>
                <button
                  onClick={() => setViewingAppointment(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-500">Doctor</label>
                  <p className="font-medium">{viewingAppointment.doctorName}</p>
                  <p className="text-sm text-gray-600">{viewingAppointment.doctorSpecialty}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Date & Time</label>
                  <p className="font-medium">
                    {new Date(viewingAppointment.appointmentDate).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-sm text-gray-600">Time: {viewingAppointment.timeSlot}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Reason</label>
                  <p className="font-medium">{viewingAppointment.reason}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Status</label>
                  <p>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(viewingAppointment.status)}`}>
                      {viewingAppointment.status.charAt(0).toUpperCase() + viewingAppointment.status.slice(1)}
                    </span>
                  </p>
                </div>
                {viewingAppointment.urgent && (
                  <div className="bg-red-50 text-red-700 p-2 rounded text-sm font-medium">
                    ⚠️ This is an urgent appointment
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setViewingAppointment(null)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <CancelDialog
          isOpen={cancelDialogOpen}
          onClose={() => {
            setCancelDialogOpen(false);
            setAppointmentToCancel(null);
          }}
          onConfirm={confirmCancelAppointment}
          appointmentDetails={appointmentToCancel}
        />

      </div>
    </DashboardWrapper>

  );
}