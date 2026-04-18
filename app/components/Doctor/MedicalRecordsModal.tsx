// app/components/MedicalRecordsModal.tsx
"use client";

import {
  FileText,
  X,
  Stethoscope,
  Pill,
  Microscope,
  Heart,
  Activity,
  AlertTriangle,
  Download,
  Printer,
  Edit,
  ChevronRight,
  Calendar,
  User,
  Droplet,
  Thermometer
} from 'lucide-react';
import { useState } from 'react';

interface MedicalRecordsModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: any;
  appointments: any[];
}

export default function MedicalRecordsModal({ isOpen, onClose, patient, appointments }: MedicalRecordsModalProps) {
  const [expandedRecord, setExpandedRecord] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'diagnosis' | 'prescription' | 'visit'>('all');

  if (!isOpen) return null;

  // Mock medical records (replace with API call later)
  const medicalRecords = [
    {
      id: '1',
      type: 'diagnosis',
      title: 'Hypertension',
      date: '2024-01-15',
      doctor: 'Dr. Smith',
      description: 'Patient diagnosed with stage 1 hypertension',
      medications: ['Lisinopril 10mg']
    },
    {
      id: '2',
      type: 'prescription',
      title: 'Blood Pressure Medication',
      date: '2024-02-01',
      doctor: 'Dr. Smith',
      medications: ['Lisinopril 10mg - Take daily']
    },
    {
      id: '3',
      type: 'visit',
      title: 'Follow-up Consultation',
      date: '2024-02-10',
      doctor: 'Dr. Johnson',
      notes: 'Blood pressure improving, continue medication'
    }
  ];

  const filteredRecords = activeTab === 'all' 
    ? medicalRecords 
    : medicalRecords.filter(r => r.type === activeTab);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm " onClick={onClose} />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-xl">
                <FileText className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Medical Records</h2>
                <p className="text-sm text-gray-500">{patient?.name || 'Patient'} • Medical History</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Printer className="w-5 h-5" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Download className="w-5 h-5" />
              </button>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="overflow-y-auto p-6" style={{ maxHeight: 'calc(90vh - 80px)' }}>
            {/* Patient Summary */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xl">
                  {patient?.name?.charAt(0) || 'P'}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{patient?.name}</h3>
                  <div className="flex gap-3 text-sm text-gray-600 mt-1">
                    {patient?.age && <span>Age: {patient.age}</span>}
                    {patient?.gender && <span>• {patient.gender}</span>}
                    {patient?.bloodGroup && <span>• Blood: {patient.bloodGroup}</span>}
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b mb-4">
              {[
                { id: 'all', label: 'All Records', icon: null },
                { id: 'diagnosis', label: 'Diagnoses', icon: <Stethoscope className="w-4 h-4" /> },
                { id: 'prescription', label: 'Prescriptions', icon: <Pill className="w-4 h-4" /> },
                { id: 'visit', label: 'Visit Notes', icon: <FileText className="w-4 h-4" /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 text-sm font-medium flex items-center gap-1 border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Records List */}
            {filteredRecords.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No medical records found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredRecords.map(record => (
                  <div key={record.id} className="border rounded-xl overflow-hidden">
                    <div
                      className="p-4 bg-gray-50 cursor-pointer flex justify-between items-center hover:bg-gray-100"
                      onClick={() => setExpandedRecord(expandedRecord === record.id ? null : record.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          record.type === 'diagnosis' ? 'bg-purple-100 text-purple-700' :
                          record.type === 'prescription' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {record.type === 'diagnosis' && <Stethoscope className="w-5 h-5" />}
                          {record.type === 'prescription' && <Pill className="w-5 h-5" />}
                          {record.type === 'visit' && <FileText className="w-5 h-5" />}
                        </div>
                        <div>
                          <h4 className="font-semibold">{record.title}</h4>
                          <p className="text-xs text-gray-500">
                            {record.date} • {record.doctor}
                          </p>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 transition-transform ${expandedRecord === record.id ? 'rotate-90' : ''}`} />
                    </div>

                    {expandedRecord === record.id && (
                      <div className="p-4 border-t">
                        <p className="text-gray-600 mb-3">{record.description || record.notes}</p>
                        {record.medications && record.medications.length > 0 && (
                          <div className="bg-blue-50 rounded-lg p-3">
                            <p className="font-medium text-sm mb-2">Medications:</p>
                            <ul className="list-disc list-inside text-sm text-gray-600">
                              {record.medications.map((med, i) => <li key={i}>{med}</li>)}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}