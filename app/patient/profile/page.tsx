"use client";

import { useState, useEffect } from 'react';
import DashboardWrapper from '@/app/components/DashboardWrapper';
import { patientService } from '@/app/service/patient.service';
import { PatientProfile } from '@/app/types/patient';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Droplet,
  AlertCircle,
  Heart,
  Pill,
  MapPin,
  Edit2,
  Save,
  X,
  Key,
  Plus,
  Trash2,
  Shield,
  PhoneCall,
  Building,
  FileText,
  Activity
} from 'lucide-react';

export default function PatientProfilePage() {
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<PatientProfile>>({});
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('profile');
  const [newAllergy, setNewAllergy] = useState('');
  const [newCondition, setNewCondition] = useState('');
  const [newMedication, setNewMedication] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await patientService.getProfile();
      setProfile(data);
      setEditedProfile(data);
    } catch (err) {
      setError('Failed to load profile');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedInputChange = (parent: string, field: string, value: any) => {
    setEditedProfile(prev => ({
      ...prev,
      [parent]: { ...(prev[parent as keyof typeof prev] as object || {}), [field]: value }
    }));
  };

  const handleArrayAdd = (field: string, value: string, setter: React.Dispatch<React.SetStateAction<string>>) => {
    if (!value.trim()) return;
    const currentArray = (editedProfile[field as keyof PatientProfile] as string[]) || [];
    handleInputChange(field, [...currentArray, value.trim()]);
    setter('');
  };

  const handleArrayRemove = (field: string, index: number) => {
    const currentArray = (editedProfile[field as keyof PatientProfile] as string[]) || [];
    handleInputChange(field, currentArray.filter((_, i) => i !== index));
  };

  const handleEmergencyContactAdd = () => {
    const currentContacts = (editedProfile.emergencyContacts as any[]) || [];
    handleInputChange('emergencyContacts', [
      ...currentContacts,
      { name: '', relationship: '', phone: '' }
    ]);
  };

  const handleEmergencyContactUpdate = (index: number, field: string, value: string) => {
    const currentContacts = (editedProfile.emergencyContacts as any[]) || [];
    const updatedContacts = [...currentContacts];
    updatedContacts[index] = { ...updatedContacts[index], [field]: value };
    handleInputChange('emergencyContacts', updatedContacts);
  };

  const handleEmergencyContactRemove = (index: number) => {
    const currentContacts = (editedProfile.emergencyContacts as any[]) || [];
    handleInputChange('emergencyContacts', currentContacts.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      await patientService.updateProfile(editedProfile);
      setProfile(prev => ({ ...prev, ...editedProfile } as PatientProfile));
      setIsEditing(false);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setEditedProfile(profile || {});
    setIsEditing(false);
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    try {
      await patientService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      setPasswordSuccess('Password changed successfully');
      setPasswordError('');
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setPasswordSuccess('');
      }, 2000);
    } catch (err: any) {
      setPasswordError(err.response?.data?.message || 'Failed to change password');
    }
  };

  if (loading) {
    return (
      <DashboardWrapper requiredRole="patient">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardWrapper>
    );
  }

  if (error || !profile) {
    return (
      <DashboardWrapper requiredRole="patient">
        <div className="bg-red-50 border border-red-200 mt-12 text-red-700 px-6 py-4 rounded-lg">
          {error || 'Failed to load profile'}
        </div>
      </DashboardWrapper>
    );
  }

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'medical', label: 'Medical History', icon: Activity },
    { id: 'emergency', label: 'Emergency Contacts', icon: Shield },
  ];

  return (
    <DashboardWrapper requiredRole="patient">
      <div className="max-w-7xl mx-auto mt-6">
        {/* Header */}
        <div className="flex justify-between items-center mt-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">Patient Profile</h1>
            <p className="text-gray-600 mt-1">Manage your health information</p>
          </div>
          <div className="flex gap-3">
            {!isEditing ? (
              <>
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  <Key size={18} />
                  Change Password
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Edit2 size={18} />
                  Edit Profile
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  <X size={18} />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              </>
            )}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex gap-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Profile Picture & Basic Info */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mb-4">
                    {profile.profilePicture ? (
                      <img
                        src={profile.profilePicture}
                        alt={profile.fullName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User size={48} className="text-green-600" />
                    )}
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.fullName || ''}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className="text-xl font-bold text-center border rounded-lg px-3 py-2 w-full"
                    />
                  ) : (
                    <h2 className="text-xl font-bold text-gray-900">{profile.fullName}</h2>
                  )}
                  
                  <div className="w-full mt-6 space-y-3">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Mail size={18} />
                      <span>{profile.email}</span>
                    </div>
                    {isEditing ? (
                      <div className="flex items-center gap-3">
                        <Phone size={18} className="text-gray-600" />
                        <input
                          type="text"
                          value={editedProfile.phone || ''}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="flex-1 border rounded-lg px-3 py-2"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 text-gray-600">
                        <Phone size={18} />
                        <span>{profile.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin size={18} />
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedProfile.address || ''}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="flex-1 border rounded-lg px-3 py-2"
                        />
                      ) : (
                        <span>{profile.address || 'No address provided'}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Personal Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Personal Information */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Date of Birth</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editedProfile.dateOfBirth?.split('T')[0] || ''}
                        onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Blood Group</label>
                    {isEditing ? (
                      <select
                        value={editedProfile.bloodGroup || ''}
                        onChange={(e) => handleInputChange('bloodGroup', e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                      >
                        <option value="">Select Blood Group</option>
                        {bloodGroups.map(bg => (
                          <option key={bg} value={bg}>{bg}</option>
                        ))}
                      </select>
                    ) : (
                      <p className="text-gray-900">{profile.bloodGroup || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Emergency Contact Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.emergencyContact || ''}
                        onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.emergencyContact || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Insurance Provider</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.insuranceInfo?.provider || ''}
                        onChange={(e) => handleNestedInputChange('insuranceInfo', 'provider', e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.insuranceInfo?.provider || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Policy Number</label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedProfile.insuranceInfo?.policyNumber || ''}
                        onChange={(e) => handleNestedInputChange('insuranceInfo', 'policyNumber', e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.insuranceInfo?.policyNumber || 'Not provided'}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Insurance Expiry</label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editedProfile.insuranceInfo?.expiryDate?.split('T')[0] || ''}
                        onChange={(e) => handleNestedInputChange('insuranceInfo', 'expiryDate', e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                      />
                    ) : (
                      <p className="text-gray-900">{profile.insuranceInfo?.expiryDate ? new Date(profile.insuranceInfo.expiryDate).toLocaleDateString() : 'Not provided'}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Medical History Tab */}
        {activeTab === 'medical' && (
          <div className="space-y-6">
            {/* Allergies */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <AlertCircle size={20} className="text-red-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Allergies</h3>
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newAllergy}
                      onChange={(e) => setNewAllergy(e.target.value)}
                      placeholder="Add allergy..."
                      className="border rounded-lg px-3 py-2 text-sm"
                    />
                    <button
                      onClick={() => handleArrayAdd('allergies', newAllergy, setNewAllergy)}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {(isEditing ? editedProfile.allergies : profile.allergies)?.map((allergy, index) => (
                  <div key={index} className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1 rounded-full">
                    <span>{allergy}</span>
                    {isEditing && (
                      <button onClick={() => handleArrayRemove('allergies', index)} className="hover:text-red-900">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
                {(!isEditing && (!profile.allergies || profile.allergies.length === 0)) && (
                  <p className="text-gray-500">No allergies recorded</p>
                )}
              </div>
            </div>

            {/* Chronic Conditions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Heart size={20} className="text-orange-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Chronic Conditions</h3>
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newCondition}
                      onChange={(e) => setNewCondition(e.target.value)}
                      placeholder="Add condition..."
                      className="border rounded-lg px-3 py-2 text-sm"
                    />
                    <button
                      onClick={() => handleArrayAdd('chronicConditions', newCondition, setNewCondition)}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {(isEditing ? editedProfile.chronicConditions : profile.chronicConditions)?.map((condition, index) => (
                  <div key={index} className="flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-1 rounded-full">
                    <span>{condition}</span>
                    {isEditing && (
                      <button onClick={() => handleArrayRemove('chronicConditions', index)} className="hover:text-orange-900">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
                {(!isEditing && (!profile.chronicConditions || profile.chronicConditions.length === 0)) && (
                  <p className="text-gray-500">No chronic conditions recorded</p>
                )}
              </div>
            </div>

            {/* Current Medications */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Pill size={20} className="text-green-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Current Medications</h3>
                </div>
                {isEditing && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newMedication}
                      onChange={(e) => setNewMedication(e.target.value)}
                      placeholder="Add medication..."
                      className="border rounded-lg px-3 py-2 text-sm"
                    />
                    <button
                      onClick={() => handleArrayAdd('currentMedications', newMedication, setNewMedication)}
                      className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                    >
                      Add
                    </button>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {(isEditing ? editedProfile.currentMedications : profile.currentMedications)?.map((medication, index) => (
                  <div key={index} className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded-full">
                    <span>{medication}</span>
                    {isEditing && (
                      <button onClick={() => handleArrayRemove('currentMedications', index)} className="hover:text-green-900">
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
                {(!isEditing && (!profile.currentMedications || profile.currentMedications.length === 0)) && (
                  <p className="text-gray-500">No medications recorded</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Emergency Contacts Tab */}
        {activeTab === 'emergency' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Emergency Contacts</h3>
              {isEditing && (
                <button
                  onClick={handleEmergencyContactAdd}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                >
                  <Plus size={16} />
                  Add Contact
                </button>
              )}
            </div>
            <div className="space-y-4">
              {(isEditing ? editedProfile.emergencyContacts : profile.emergencyContacts)?.map((contact, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {isEditing ? (
                      <>
                        <input
                          type="text"
                          placeholder="Name"
                          value={contact.name}
                          onChange={(e) => handleEmergencyContactUpdate(index, 'name', e.target.value)}
                          className="border rounded-lg px-3 py-2"
                        />
                        <input
                          type="text"
                          placeholder="Relationship"
                          value={contact.relationship}
                          onChange={(e) => handleEmergencyContactUpdate(index, 'relationship', e.target.value)}
                          className="border rounded-lg px-3 py-2"
                        />
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="Phone"
                            value={contact.phone}
                            onChange={(e) => handleEmergencyContactUpdate(index, 'phone', e.target.value)}
                            className="flex-1 border rounded-lg px-3 py-2"
                          />
                          <button
                            onClick={() => handleEmergencyContactRemove(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Name</label>
                          <p className="text-gray-900">{contact.name}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Relationship</label>
                          <p className="text-gray-900">{contact.relationship}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-500">Phone</label>
                          <p className="text-gray-900">{contact.phone}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
              {(!isEditing && (!profile.emergencyContacts || profile.emergencyContacts.length === 0)) && (
                <p className="text-gray-500 text-center py-4">No emergency contacts added</p>
              )}
            </div>
          </div>
        )}

        {/* Change Password Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Change Password</h3>
              
              {passwordSuccess && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg">
                  {passwordSuccess}
                </div>
              )}
              
              {passwordError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                  {passwordError}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="w-full border rounded-lg px-4 py-2"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowPasswordModal(false);
                    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
                    setPasswordError('');
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePasswordChange}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Change Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardWrapper>
  );
}