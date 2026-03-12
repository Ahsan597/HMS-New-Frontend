"use client";

import DashboardWrapper from "@/app/components/DashboardWrapper";
import { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  CalendarCheck,
  CalendarX,
  CalendarClock,
  Activity,
  Heart,
  User,
  FileText,
  Bell,
  ChevronRight,
  Star,
  TrendingUp,
  Pill,
  Thermometer,
  Droplets,
  Weight,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  BadgeCheck,
  Video,
  MessageCircle,
  FilePlus
} from "lucide-react";

// Enhanced mock data with more details
const mockApiResponse = {
  overview: {
    totalAppointments: 5,
    upcomingAppointments: 2,
    completedAppointments: 2,
    cancelledAppointments: 1,
    pendingRequests: 0
  },
  visitHistory: {
    monthly: [1, 0, 2, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    yearly: [3, 4, 5, 2],
    lastVisitDate: "2026-02-28"
  },
  nextVisit: "2026-03-15",
  patientInfo: {
    name: "John Doe",
    age: 32,
    bloodGroup: "O+",
    weight: "75 kg",
    height: "175 cm",
    allergies: ["Pollen", "Penicillin"],
    conditions: ["Seasonal Allergies"]
  },
  upcomingAppointments: [
    {
      id: 1,
      doctorName: "Dr. Sarah Smith",
      specialization: "Cardiologist",
      date: "2026-03-15",
      time: "10:30 AM",
      type: "Check-up",
      status: "confirmed",
      avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150"
    },
    {
      id: 2,
      doctorName: "Dr. Michael Chen",
      specialization: "Dermatologist",
      date: "2026-03-20",
      time: "02:00 PM",
      type: "Follow-up",
      status: "pending",
      avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150"
    }
  ],
  recentPrescriptions: [
    {
      id: 1,
      medication: "Amoxicillin",
      dosage: "500mg",
      frequency: "Twice daily",
      prescribedBy: "Dr. Sarah Smith",
      date: "2026-02-28",
      status: "active"
    },
    {
      id: 2,
      medication: "Loratadine",
      dosage: "10mg",
      frequency: "Once daily",
      prescribedBy: "Dr. Michael Chen",
      date: "2026-02-15",
      status: "completed"
    }
  ],
  healthMetrics: {
    heartRate: 72,
    bloodPressure: "120/80",
    temperature: "98.6",
    oxygenLevel: 98,
    steps: 8432
  }
};

export default function PatientDashboardPage() {
  const [data, setData] = useState(mockApiResponse);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
    
    // Replace with API call
    // fetch('/api/patient/dashboard').then(res => res.json()).then(setData);
  }, []);

  const stats = [
    { 
      title: "Total Appointments", 
      value: data.overview.totalAppointments, 
      icon: Calendar, 
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      trend: "+2 this month"
    },
    { 
      title: "Upcoming", 
      value: data.overview.upcomingAppointments, 
      icon: CalendarClock, 
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      trend: "Next: Mar 15"
    },
    { 
      title: "Completed", 
      value: data.overview.completedAppointments, 
      icon: CheckCircle, 
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      iconColor: "text-purple-600",
      trend: "Last 30 days"
    },
    { 
      title: "Cancelled", 
      value: data.overview.cancelledAppointments, 
      icon: XCircle, 
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
      trend: "1 this month"
    },
    { 
      title: "Pending", 
      value: data.overview.pendingRequests, 
      icon: AlertCircle, 
      color: "from-yellow-500 to-yellow-600",
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
      trend: "Awaiting response"
    },
  ];

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const StatCard = ({ title, value, icon: Icon, color, bgColor, iconColor, trend }: any) => (
    <div className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 min-w-[200px]">
      <div className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
      
      <div className="flex items-start gap-4">
        <div className={`${bgColor} p-4 rounded-xl`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
          {trend && (
            <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              {trend}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <DashboardWrapper requiredRole="patient">
      <div className="space-y-8 mt-4">
        {/* Enhanced Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mt-6">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Patient Dashboard
              </h1>
              <BadgeCheck className="w-6 h-6 text-blue-500" />
            </div>
            <p className="text-gray-500 text-lg flex items-center gap-2 mt-1">
              <span>{greeting}, {data.patientInfo.name}</span>
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Active</span>
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3">
            <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </button>
            
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all hover:-translate-y-0.5 flex items-center gap-2 text-sm font-medium">
              <Video className="w-4 h-4" />
              <span>Consult Now</span>
            </button>
            
            <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium">
              <FilePlus className="w-4 h-4" />
              <span>Book Appointment</span>
            </button>
          </div>
        </div>

        {/* Health Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-gradient-to-br from-red-50 to-red-100/50 rounded-xl p-4 border border-red-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-red-700 font-medium">Heart Rate</p>
                <p className="text-xl font-bold text-gray-800 mt-1">{data.healthMetrics.heartRate} <span className="text-sm font-normal text-gray-500">bpm</span></p>
              </div>
              <Heart className="w-6 h-6 text-red-500" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-xl p-4 border border-blue-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-blue-700 font-medium">Blood Pressure</p>
                <p className="text-xl font-bold text-gray-800 mt-1">{data.healthMetrics.bloodPressure}</p>
              </div>
              <Activity className="w-6 h-6 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-xl p-4 border border-amber-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-amber-700 font-medium">Temperature</p>
                <p className="text-xl font-bold text-gray-800 mt-1">{data.healthMetrics.temperature}°F</p>
              </div>
              <Thermometer className="w-6 h-6 text-amber-500" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100/50 rounded-xl p-4 border border-green-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-green-700 font-medium">Oxygen Level</p>
                <p className="text-xl font-bold text-gray-800 mt-1">{data.healthMetrics.oxygenLevel}%</p>
              </div>
              <Droplets className="w-6 h-6 text-green-500" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-xl p-4 border border-purple-200/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-purple-700 font-medium">Steps Today</p>
                <p className="text-xl font-bold text-gray-800 mt-1">{data.healthMetrics.steps.toLocaleString()}</p>
              </div>
              <TrendingUp className="w-6 h-6 text-purple-500" />
            </div>
          </div>
        </div>

        {/* Stats Cards - Now in a single row with scroll on mobile */}
        <div className="overflow-x-auto pb-4 hide-scrollbar">
          <div className="flex gap-6 min-w-max">
            {stats.map((stat) => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>
        </div>

        {/* Next Appointment & Last Visit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <CalendarCheck className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800">Next Appointment</h2>
              </div>
              {data.nextVisit && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  Confirmed
                </span>
              )}
            </div>
            
            {data.nextVisit ? (
              <div className="space-y-4">
                <p className="text-gray-600">
                  Your next appointment is on{" "}
                  <span className="font-semibold text-blue-600">
                    {new Date(data.nextVisit).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </span>
                </p>
                <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                  <img 
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150"
                    alt="Dr. Sarah Smith"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-800">Dr. Sarah Smith</p>
                    <p className="text-sm text-gray-500">Cardiologist • 10:30 AM</p>
                  </div>
                </div>
                <button className="w-full mt-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  View Details
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No upcoming appointments</p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium">
                  Book Appointment
                </button>
              </div>
            )}
          </div>

          <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <FileText className="w-6 h-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Last Visit</h2>
            </div>
            
            {data.visitHistory.lastVisitDate ? (
              <div className="space-y-4">
                <p className="text-gray-600">
                  Your last visit was on{" "}
                  <span className="font-semibold text-purple-600">
                    {new Date(data.visitHistory.lastVisitDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric"
                    })}
                  </span>
                </p>
                <div className="p-3 bg-gray-50 rounded-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Doctor</span>
                    <span className="text-sm font-medium text-gray-800">Dr. Michael Chen</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">Diagnosis</span>
                    <span className="text-sm font-medium text-gray-800">Seasonal Allergies</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">Prescription</span>
                    <span className="text-sm font-medium text-gray-800">Loratadine 10mg</span>
                  </div>
                </div>
                <button className="w-full px-4 py-2 bg-purple-50 text-purple-600 rounded-xl hover:bg-purple-100 transition-colors text-sm font-medium flex items-center justify-center gap-2">
                  View Summary
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No visit history yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Appointments & Recent Prescriptions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CalendarClock className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Upcoming Appointments</h2>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {data.upcomingAppointments.map((apt) => (
                <div key={apt.id} className="p-4 hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <img 
                      src={apt.avatar} 
                      alt={apt.doctorName}
                      className="w-12 h-12 rounded-xl object-cover"
                    />
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-800">{apt.doctorName}</p>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          apt.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {apt.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{apt.specialization}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date(apt.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>{apt.time}</span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-200 rounded-lg">
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Prescriptions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Pill className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">Recent Prescriptions</h2>
                </div>
                <button className="text-sm text-green-600 hover:text-green-700 font-medium flex items-center gap-1">
                  View All
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {data.recentPrescriptions.map((rx) => (
                <div key={rx.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-800">{rx.medication}</p>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          rx.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {rx.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{rx.dosage} • {rx.frequency}</p>
                      <p className="text-xs text-gray-400 mt-1">Prescribed by {rx.prescribedBy}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">{new Date(rx.date).toLocaleDateString()}</p>
                      <button className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium">
                        Refill
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Visit History Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Activity className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-lg font-semibold text-gray-800">Visit History</h2>
            </div>
            <div className="flex items-center gap-2">
              <button className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm">Monthly</button>
              <button className="px-3 py-1 hover:bg-gray-100 rounded-lg text-sm">Yearly</button>
            </div>
          </div>
          
          <div className="relative h-48 flex items-end justify-between gap-2">
            {data.visitHistory.monthly.map((count, idx) => {
              const maxCount = Math.max(...data.visitHistory.monthly, 1);
              const height = (count / maxCount) * 100;
              
              return (
                <div key={idx} className="flex-1 flex flex-col items-center group">
                  <div className="relative w-full">
                    <div 
                      className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-300 group-hover:from-blue-600 group-hover:to-blue-500"
                      style={{ height: `${height}%`, minHeight: count > 0 ? '20px' : '4px' }}
                    >
                      {count > 0 && (
                        <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded">
                          {count} visits
                        </div>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500 mt-2">{monthNames[idx]}</span>
                  {count > 0 && (
                    <span className="text-xs font-medium text-blue-600 mt-1">{count}</span>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-between text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span className="text-gray-600">Total visits: {data.visitHistory.monthly.reduce((a, b) => a + b, 0)}</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowUpRight className="w-4 h-4 text-green-500" />
                <span className="text-gray-600">+2 from last month</span>
              </div>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
              View Details
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Patient Information Card */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-6 border border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500">Blood Group</p>
              <p className="text-lg font-semibold text-gray-800">{data.patientInfo.bloodGroup}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Weight</p>
              <p className="text-lg font-semibold text-gray-800">{data.patientInfo.weight}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Height</p>
              <p className="text-lg font-semibold text-gray-800">{data.patientInfo.height}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Allergies</p>
              <p className="text-lg font-semibold text-gray-800">{data.patientInfo.allergies.join(", ")}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom scrollbar hide class */}
      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </DashboardWrapper>
  );
}