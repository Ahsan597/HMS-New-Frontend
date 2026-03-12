"use client";

import { useState, useEffect } from "react";
import DashboardWrapper from "@/app/components/DashboardWrapper";
import { Calendar, Users, Clock, CheckCircle, XCircle, TrendingUp, Activity, UserPlus, FileText } from "lucide-react";

// Mock data - in real app, this would come from an API
const mockStats = {
  appointments: {
    todaysAppointments: 12,
    pendingApprovals: 5,
    completedToday: 8,
    cancelledToday: 2
  },
  patients: {
    total: 847,
    newThisMonth: 43,
    returning: 126,
    activeCases: 28
  }
};

// Mock recent appointments
const recentAppointments = [
  { id: 1, patientName: "Sarah Johnson", time: "09:00 AM", type: "Check-up", status: "completed" },
  { id: 2, patientName: "Michael Chen", time: "10:30 AM", type: "Follow-up", status: "in-progress" },
  { id: 3, patientName: "Emily Davis", time: "11:45 AM", type: "Consultation", status: "pending" },
  { id: 4, patientName: "Robert Wilson", time: "02:00 PM", type: "Emergency", status: "pending" },
  { id: 5, patientName: "Lisa Anderson", time: "03:30 PM", type: "Regular Check", status: "scheduled" },
];

// Mock patient list
const recentPatients = [
  { id: 1, name: "Sarah Johnson", lastVisit: "2024-03-15", condition: "Hypertension", status: "active" },
  { id: 2, name: "Michael Chen", lastVisit: "2024-03-14", condition: "Diabetes Type 2", status: "active" },
  { id: 3, name: "Emily Davis", lastVisit: "2024-03-14", condition: "Asthma", status: "stable" },
  { id: 4, name: "Robert Wilson", lastVisit: "2024-03-13", condition: "Arthritis", status: "active" },
  { id: 5, name: "Lisa Anderson", lastVisit: "2024-03-12", condition: "Migraine", status: "stable" },
];

export default function DoctorDashboardPage() {
  const [stats, setStats] = useState(mockStats);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const StatCard = ({ title, value, icon: Icon, color, subtitle }: any) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2 text-gray-800">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  return (
    <DashboardWrapper requiredRole="doctor">
      {/* Header Section */}
      <div className="mt-6 ">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mt-3">Doctor Dashboard</h1>
            <p className="text-gray-500 mt-3">
              {greeting}, Dr. Smith. Here's your practice overview for today.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span>Today's Schedule</span>
            </button>
            <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>New Appointment</span>
            </button>
          </div>
        </div>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Today's Appointments"
          value={stats.appointments.todaysAppointments}
          icon={Calendar}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          subtitle={`${stats.appointments.completedToday} completed`}
        />
        <StatCard
          title="Pending Approvals"
          value={stats.appointments.pendingApprovals}
          icon={Clock}
          color="bg-gradient-to-br from-yellow-500 to-yellow-600"
          subtitle="Awaiting confirmation"
        />
        <StatCard
          title="Total Patients"
          value={stats.patients.total}
          icon={Users}
          color="bg-gradient-to-br from-green-500 to-green-600"
          subtitle={`${stats.patients.newThisMonth} new this month`}
        />
        <StatCard
          title="Active Cases"
          value={stats.patients.activeCases}
          icon={Activity}
          color="bg-gradient-to-br from-purple-500 to-purple-600"
          subtitle="Currently under care"
        />
      </div>


      {/* Today's Progress Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Today's Progress</h2>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span className="text-gray-600">{stats.appointments.completedToday} Completed</span>
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4 text-yellow-500" />
              <span className="text-gray-600">{stats.appointments.pendingApprovals} Pending</span>
            </span>
            <span className="flex items-center gap-1">
              <XCircle className="w-4 h-4 text-red-500" />
              <span className="text-gray-600">{stats.appointments.cancelledToday} Cancelled</span>
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(stats.appointments.completedToday / stats.appointments.todaysAppointments) * 100}%` }}
          />
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        {/* Recent Appointments */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Today's Appointments</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {recentAppointments.map((apt) => (
              <div key={apt.id} className="flex items-center justify-between p-4 border-b border-gray-400  rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {apt.patientName.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="mt-4">
                    <p className="font-medium text-black">{apt.patientName}</p>
                    <p className="text-sm text-black">{apt.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm px-4 text-gray-600">{apt.time}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium
                    ${apt.status === 'completed' ? 'bg-green-100 text-green-700' : ''}
                    ${apt.status === 'in-progress' ? 'bg-blue-100 text-blue-700' : ''}
                    ${apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : ''}
                    ${apt.status === 'scheduled' ? 'bg-gray-100 text-gray-700' : ''}
                  `}>
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Patients */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">Recent Patients</h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="flex mt-4 items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors ">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {patient.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{patient.name}</p>
                    <p className="text-sm text-gray-500">{patient.condition}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500">Last: {patient.lastVisit}</span>
                  <span className={`w-2 h-2 rounded-full ${patient.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className=" pt-6 border-t border-gray-100 mt-4">
            <h3 className="text-sm font-medium text-gray-500 mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex flex-col items-center gap-2">
                <UserPlus className="w-5 h-5 text-blue-500" />
                <span className="text-xs text-gray-600">New Patient</span>
              </button>
              <button className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors flex flex-col items-center gap-2">
                <FileText className="w-5 h-5 text-green-500" />
                <span className="text-xs text-gray-600">Write Prescription</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-8 text-center text-sm text-gray-400">
        <p>Last updated: {new Date().toLocaleTimeString()}</p>
      </div>
    </DashboardWrapper>
  );
}