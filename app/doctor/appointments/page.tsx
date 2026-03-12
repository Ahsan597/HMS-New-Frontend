"use client";

import { useState } from 'react';
import DashboardWrapper from '@/app/components/DashboardWrapper';
import {
  Calendar,
  Clock,
  Filter,
  Search,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Download,
  CalendarDays,
  ListFilter,
  RefreshCw,
  User,
  Phone,
  Mail,
  MapPin,
  FileText,
  MessageSquare,
  Video,
  Edit,
  Trash2,
  Eye,
  Check,
  X,
  Clock3,
  CalendarCheck,
  CalendarX,
  CalendarClock,
  ArrowUpDown,
  SlidersHorizontal,
  DownloadCloud,
  Plus
} from 'lucide-react';

// Mock data matching your API structure
const mockAppointments = [
  {
    _id: "69845f0de888a1757435ef22",
    patientId: {
      _id: "pat123",
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 123-4567",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      age: 34,
      gender: "Female",
      bloodGroup: "A+",
      address: "123 Main St, New York, NY"
    },
    doctorId: "doc456",
    appointmentDate: "2026-02-10T11:00:00.000Z",
    timeSlot: "11:00-11:30",
    status: "confirmed",
    reason: "Follow-up consultation",
    urgent: true,
    createdAt: "2026-02-05T09:12:45.346Z",
    updatedAt: "2026-02-05T09:18:59.775Z",
    type: "Follow-up",
    notes: "Patient needs medication review"
  },
  {
    _id: "698461e2e888a1757435ef2e",
    patientId: {
      _id: "pat456",
      name: "Michael Chen",
      email: "michael.c@email.com",
      phone: "+1 (555) 234-5678",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      age: 42,
      gender: "Male",
      bloodGroup: "O+",
      address: "456 Park Ave, Los Angeles, CA"
    },
    doctorId: "doc456",
    appointmentDate: "2026-02-10T10:00:00.000Z",
    timeSlot: "10:00-10:30",
    status: "pending",
    reason: "General checkup",
    urgent: false,
    createdAt: "2026-02-05T09:24:50.013Z",
    updatedAt: "2026-02-05T09:24:50.013Z",
    type: "Check-up",
    notes: "First visit"
  },
  {
    _id: "6984624fe888a1757435ef33",
    patientId: {
      _id: "pat789",
      name: "Emily Davis",
      email: "emily.d@email.com",
      phone: "+1 (555) 345-6789",
      avatar: "https://images.unsplash.com/photo-1494790108777-467efb7a2d9e?w=150",
      age: 28,
      gender: "Female",
      bloodGroup: "B+",
      address: "789 Oak St, Chicago, IL"
    },
    doctorId: "doc456",
    appointmentDate: "2026-02-10T10:00:00.000Z",
    timeSlot: "10:00-10:30",
    status: "canceled",
    reason: "General checkup",
    urgent: false,
    createdAt: "2026-02-05T09:26:39.891Z",
    updatedAt: "2026-02-05T09:29:55.402Z",
    type: "Check-up",
    notes: "Rescheduled"
  },
  {
    _id: "6984631fad541b25f8d4d6af",
    patientId: {
      _id: "pat101",
      name: "Robert Wilson",
      email: "robert.w@email.com",
      phone: "+1 (555) 456-7890",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
      age: 55,
      gender: "Male",
      bloodGroup: "AB+",
      address: "321 Pine St, Houston, TX"
    },
    doctorId: "doc456",
    appointmentDate: "2026-02-10T14:00:00.000Z",
    timeSlot: "14:00-14:30",
    status: "confirmed",
    reason: "Emergency consultation",
    urgent: true,
    createdAt: "2026-02-05T09:30:07.908Z",
    updatedAt: "2026-02-05T09:30:16.695Z",
    type: "Emergency",
    notes: "High priority"
  },
  {
    _id: "6984642fad541b25f8d4d6b0",
    patientId: {
      _id: "pat102",
      name: "Lisa Anderson",
      email: "lisa.a@email.com",
      phone: "+1 (555) 567-8901",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
      age: 31,
      gender: "Female",
      bloodGroup: "O-",
      address: "654 Cedar St, Miami, FL"
    },
    doctorId: "doc456",
    appointmentDate: "2026-02-11T09:30:00.000Z",
    timeSlot: "09:30-10:00",
    status: "pending",
    reason: "Migraine consultation",
    urgent: false,
    createdAt: "2026-02-05T09:35:12.456Z",
    updatedAt: "2026-02-05T09:35:12.456Z",
    type: "Consultation",
    notes: "Recurring headaches"
  }
];

// Stats cards data
const appointmentStats = {
  total: 24,
  today: 8,
  confirmed: 12,
  pending: 6,
  canceled: 4,
  urgent: 3
};

export default function Appointments() {
  const [selectedDate, setSelectedDate] = useState('2026-02-10');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [showFilters, setShowFilters] = useState(false);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'confirmed': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'canceled': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'confirmed':
        return <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Confirmed</span>;
      case 'pending':
        return <span className="px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>;
      case 'canceled':
        return <span className="px-2.5 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium flex items-center gap-1"><XCircle className="w-3 h-3" /> Canceled</span>;
      default:
        return <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{status}</span>;
    }
  };

  const getUrgencyBadge = (urgent: boolean) => {
    if (urgent) {
      return <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Urgent</span>;
    }
    return null;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <DashboardWrapper requiredRole="doctor">
      {/* Header Section */}
      <div className="mt-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent flex items-center gap-2">
              Appointments
              <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {mockAppointments.length} total
              </span>
            </h1>
            <p className="text-gray-500 mt-1">Manage and track all patient appointments</p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
              className="px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              {viewMode === 'list' ? <CalendarDays className="w-4 h-4" /> : <ListFilter className="w-4 h-4" />}
              {viewMode === 'list' ? 'Calendar View' : 'List View'}
            </button>
            
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium">
              <DownloadCloud className="w-4 h-4" />
              Export
            </button>
            
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all hover:-translate-y-0.5 flex items-center gap-2 text-sm font-medium">
              <Plus className="w-4 h-4" />
              New Appointment
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-2xl font-bold text-gray-800">{appointmentStats.total}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <p className="text-sm text-gray-500">Today</p>
            <p className="text-2xl font-bold text-blue-600">{appointmentStats.today}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <p className="text-sm text-gray-500">Confirmed</p>
            <p className="text-2xl font-bold text-green-600">{appointmentStats.confirmed}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">{appointmentStats.pending}</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
            <p className="text-sm text-gray-500">Urgent</p>
            <p className="text-2xl font-bold text-red-600">{appointmentStats.urgent}</p>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white rounded-xl border border-gray-100 p-4 mb-6 shadow-sm mt-2">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient name, reason, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Date Filter */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 border rounded-xl flex items-center gap-2 transition-colors ${
              showFilters 
                ? 'bg-blue-50 border-blue-200 text-blue-600' 
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            More Filters
          </button>

          {/* Refresh Button */}
          <button className="p-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            <RefreshCw className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Advanced Filters (Collapsible) */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">
            <select className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
              <option>Appointment Type</option>
              <option>Check-up</option>
              <option>Follow-up</option>
              <option>Emergency</option>
              <option>Consultation</option>
            </select>
            
            <select className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
              <option>Time Slot</option>
              <option>Morning (9AM-12PM)</option>
              <option>Afternoon (12PM-4PM)</option>
              <option>Evening (4PM-7PM)</option>
            </select>
            
            <select className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white">
              <option>Sort By</option>
              <option>Date (Newest)</option>
              <option>Date (Oldest)</option>
              <option>Patient Name</option>
              <option>Status</option>
            </select>
            
            <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors">
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointments List - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
            {/* List Header */}
            <div className="p-4 border-b border-gray-100 bg-gray-50/50">
              <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div className="col-span-4">Patient</div>
                <div className="col-span-2">Date & Time</div>
                <div className="col-span-2">Type</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-2">Actions</div>
              </div>
            </div>

            {/* Appointment Items */}
            <div className="divide-y divide-gray-100">
              {mockAppointments.map((appointment) => (
                <div 
                  key={appointment._id} 
                  className={`p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                    selectedAppointment?._id === appointment._id ? 'bg-blue-50/50' : ''
                  }`}
                  onClick={() => setSelectedAppointment(appointment)}
                >
                  <div className="grid grid-cols-12 gap-4 items-center">
                    {/* Patient Info */}
                    <div className="col-span-4">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img 
                            src={appointment.patientId.avatar} 
                            alt={appointment.patientId.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          {appointment.urgent && (
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center">
                              <AlertCircle className="w-2 h-2 text-white" />
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{appointment.patientId.name}</p>
                          <p className="text-xs text-gray-500">{appointment.reason.substring(0, 20)}...</p>
                        </div>
                      </div>
                    </div>

                    {/* Date & Time */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="text-sm text-gray-800">{formatDate(appointment.appointmentDate)}</p>
                          <p className="text-xs text-gray-500">{appointment.timeSlot}</p>
                        </div>
                      </div>
                    </div>

                    {/* Type */}
                    <div className="col-span-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        appointment.type === 'Emergency' ? 'bg-red-100 text-red-700' :
                        appointment.type === 'Follow-up' ? 'bg-blue-100 text-blue-700' :
                        appointment.type === 'Check-up' ? 'bg-green-100 text-green-700' :
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {appointment.type}
                      </span>
                    </div>

                    {/* Status */}
                    <div className="col-span-2">
                      {getStatusBadge(appointment.status)}
                    </div>

                    {/* Actions */}
                    <div className="col-span-2">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 hover:bg-blue-100 rounded-lg transition-colors">
                          <Eye className="w-4 h-4 text-blue-600" />
                        </button>
                        <button className="p-1.5 hover:bg-green-100 rounded-lg transition-colors">
                          <Check className="w-4 h-4 text-green-600" />
                        </button>
                        <button className="p-1.5 hover:bg-red-100 rounded-lg transition-colors">
                          <X className="w-4 h-4 text-red-600" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-200 rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-500">Showing 1-5 of 24 appointments</p>
              <div className="flex items-center gap-2">
                <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">1</button>
                <button className="px-3 py-1 hover:bg-gray-100 rounded-lg text-sm">2</button>
                <button className="px-3 py-1 hover:bg-gray-100 rounded-lg text-sm">3</button>
                <span className="px-2">...</span>
                <button className="px-3 py-1 hover:bg-gray-100 rounded-lg text-sm">8</button>
                <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Details Sidebar */}
        <div className="lg:col-span-1">
          {selectedAppointment ? (
            <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-800">Appointment Details</h3>
                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Edit className="w-4 h-4 text-gray-600" />
                </button>
              </div>

              {/* Patient Quick Info */}
              <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                <img 
                  src={selectedAppointment.patientId.avatar} 
                  alt={selectedAppointment.patientId.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800">{selectedAppointment.patientId.name}</p>
                  <p className="text-sm text-gray-500">{selectedAppointment.patientId.age} years • {selectedAppointment.patientId.gender}</p>
                  <p className="text-xs text-gray-400 mt-1">Blood: {selectedAppointment.patientId.bloodGroup}</p>
                </div>
              </div>

              {/* Appointment Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Date & Time</p>
                    <p className="text-sm text-gray-600">{formatDate(selectedAppointment.appointmentDate)}</p>
                    <p className="text-xs text-gray-500">{selectedAppointment.timeSlot}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Reason</p>
                    <p className="text-sm text-gray-600">{selectedAppointment.reason}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Status</p>
                    <div className="mt-1">
                      {getStatusBadge(selectedAppointment.status)}
                    </div>
                  </div>
                </div>

                {selectedAppointment.urgent && (
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-600">Urgent Case</p>
                      <p className="text-xs text-gray-500">Requires immediate attention</p>
                    </div>
                  </div>
                )}

                {selectedAppointment.notes && (
                  <div className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">Notes</p>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{selectedAppointment.notes}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Patient Contact */}
              <div className="border-t border-gray-100 pt-4 mb-6">
                <h4 className="text-sm font-medium text-gray-700 mb-3">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{selectedAppointment.patientId.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{selectedAppointment.patientId.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{selectedAppointment.patientId.address}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm">
                  <Video className="w-4 h-4" />
                  Video Call
                </button>
                <button className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm">
                  <MessageSquare className="w-4 h-4" />
                  Message
                </button>
                <button className="px-4 py-2 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-colors flex items-center justify-center gap-2 text-sm col-span-2">
                  <FileText className="w-4 h-4" />
                  View Medical Records
                </button>
              </div>

              {/* Quick Actions */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between gap-2">
                  <button className="flex-1 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-xs font-medium flex items-center justify-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Confirm
                  </button>
                  <button className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-xs font-medium flex items-center justify-center gap-1">
                    <XCircle className="w-3 h-3" />
                    Cancel
                  </button>
                  <button className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-xs font-medium flex items-center justify-center gap-1">
                    <Clock3 className="w-3 h-3" />
                    Reschedule
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
              <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">No Appointment Selected</h3>
              <p className="text-sm text-gray-500">Select an appointment from the list to view details</p>
            </div>
          )}
        </div>
      </div>
    </DashboardWrapper>
  );
}