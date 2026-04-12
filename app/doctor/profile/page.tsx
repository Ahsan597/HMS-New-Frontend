"use client";

import { useState, useEffect } from 'react';
import DashboardWrapper from '@/app/components/DashboardWrapper';
import { doctorService } from '@/app/service/doctor.service';
import { DoctorProfile } from '@/app/types/doctor';
import {
  User,
  Mail,
  Phone,
  Briefcase,
  Award,
  DollarSign,
  Languages,
  MapPin,
  Calendar,
  Clock,
  Edit2,
  Save,
  X,
  Key,
  Plus,
  Trash2,
  Star,
  MessageCircle,
  FileText
} from 'lucide-react';

export default function ProfilePage() {
  const [profile, setProfile] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState<Partial<DoctorProfile>>({});
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [newQualification, setNewQualification] = useState('');
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const data = await doctorService.getProfile();
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

  const handleSave = async () => {
    try {
      await doctorService.updateProfile(editedProfile);
      setProfile(prev => ({ ...prev, ...editedProfile } as DoctorProfile));
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
    // Trim whitespace from passwords
    const currentPassword = passwordData.currentPassword.trim();
    const newPassword = passwordData.newPassword.trim();
    const confirmPassword = passwordData.confirmPassword.trim();

    console.log('Current:', currentPassword);
    console.log('New:', newPassword);
    console.log('Confirm:', confirmPassword);
    console.log('Do they match?', newPassword === confirmPassword);

    // Clear previous errors
    setPasswordError('');

    // Validation checks
    if (!currentPassword) {
      setPasswordError('Current password is required');
      return;
    }

    if (!newPassword) {
      setPasswordError('New password is required');
      return;
    }

    if (!confirmPassword) {
      setPasswordError('Please confirm your new password');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return;
    }

    // Check if new password is same as current
    if (newPassword === currentPassword) {
      setPasswordError('New password must be different from current password');
      return;
    }

    try {
      // ✅ FIXED: Send all three fields including confirmPassword
      await doctorService.changePassword({
        currentPassword: currentPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword  // ← THIS WAS MISSING
      });

      setPasswordSuccess('Password changed successfully');
      setPasswordError('');

      // Clear form and close modal after success
      setTimeout(() => {
        setShowPasswordModal(false);
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
        setPasswordSuccess('');
      }, 2000);

    } catch (err: any) {
      console.error('Password change error:', err);
      setPasswordError(err.response?.data?.message || 'Failed to change password');
    }
  };

  const handleAddQualification = async () => {
    if (!newQualification.trim()) return;
    try {
      await doctorService.addQualification(newQualification);
      await fetchProfile(); // Refresh profile
      setNewQualification('');
    } catch (err) {
      setError('Failed to add qualification');
    }
  };

  const handleRemoveQualification = async (qualification: string) => {
    try {
      await doctorService.removeQualification(qualification);
      await fetchProfile(); // Refresh profile
    } catch (err) {
      setError('Failed to remove qualification');
    }
  };

  if (loading) {
    return (
      <DashboardWrapper requiredRole="doctor">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardWrapper>
    );
  }

  if (error || !profile) {
    return (
      <DashboardWrapper requiredRole="doctor">
        <div className="bg-red-50 border border-red-200 mt-12 text-red-700 px-6 py-4 rounded-lg">
          {error || 'Failed to load profile'}
        </div>
      </DashboardWrapper>
    );
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'schedule', label: 'Schedule', icon: Calendar },
    { id: 'qualifications', label: 'Qualifications', icon: Award },
    { id: 'earnings', label: 'Earnings', icon: DollarSign },
  ];

  return (
    <DashboardWrapper requiredRole="doctor">
      <div className="max-w-7xl  mt-6">
        {/* Header */}
        <div className="flex justify-between items-center mt-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">Doctor Profile</h1>
            <p className="text-gray-600 mt-1">Manage your professional information</p>
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
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition ${activeTab === tab.id
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
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mb-4">
                    {profile.profilePicture ? (
                      <img
                        src={profile.profilePicture}
                        alt={profile.fullName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <User size={48} className="text-blue-600" />
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
                  <p className="text-gray-600 mt-1">{profile.specialization}</p>

                  <div className="flex items-center gap-1 mt-3">
                    <Star size={16} className="text-yellow-400 fill-current" />
                    <span className="font-medium">{profile.rating.toFixed(1)}</span>
                    <span className="text-gray-500">({profile.totalReviews} reviews)</span>
                  </div>

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

            {/* Right Column - Professional Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
                {isEditing ? (
                  <textarea
                    value={editedProfile.bio || ''}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={4}
                    className="w-full border rounded-lg px-4 py-3"
                    placeholder="Write something about yourself..."
                  />
                ) : (
                  <p className="text-gray-700 leading-relaxed">
                    {profile.bio || 'No bio provided'}
                  </p>
                )}
              </div>

              {/* Professional Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Experience */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Experience</h3>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedProfile.experience || ''}
                      onChange={(e) => handleInputChange('experience', parseInt(e.target.value))}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  ) : (
                    <p className="text-2xl font-bold text-gray-900">{profile.experience} years</p>
                  )}
                </div>

                {/* Consultation Fee */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Consultation Fee</h3>
                  {isEditing ? (
                    <input
                      type="number"
                      value={editedProfile.consultationFee || ''}
                      onChange={(e) => handleInputChange('consultationFee', parseInt(e.target.value))}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  ) : (
                    <p className="text-2xl font-bold text-gray-900">${profile.consultationFee}</p>
                  )}
                </div>

                {/* License Number */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">License Number</h3>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.licenseNumber || ''}
                      onChange={(e) => handleInputChange('licenseNumber', e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                    />
                  ) : (
                    <p className="text-lg font-medium text-gray-900">{profile.licenseNumber}</p>
                  )}
                </div>

                {/* Languages */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Languages</h3>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedProfile.languages?.join(', ') || ''}
                      onChange={(e) => handleInputChange('languages', e.target.value.split(',').map(l => l.trim()))}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="English, Spanish, etc."
                    />
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profile.languages?.map((lang, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                          {lang}
                        </span>
                      )) || 'No languages added'}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                <div key={day} className="border rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 capitalize mb-2">{day}</h4>
                  {profile.availability?.[day as keyof typeof profile.availability]?.length > 0 ? (
                    profile.availability[day as keyof typeof profile.availability].map((slot: any, index: number) => (
                      <div key={index} className="text-sm text-gray-600">
                        {slot.start} - {slot.end}
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-gray-400">Not available</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Qualifications Tab */}
        {activeTab === 'qualifications' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Qualifications</h3>
              {isEditing && (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newQualification}
                    onChange={(e) => setNewQualification(e.target.value)}
                    placeholder="Add qualification..."
                    className="border rounded-lg px-3 py-2 text-sm"
                  />
                  <button
                    onClick={handleAddQualification}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
            <div className="space-y-3">
              {profile.qualifications?.map((qual, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Award size={18} className="text-blue-600" />
                    <span>{qual}</span>
                  </div>
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveQualification(qual)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              )) || <p className="text-gray-500">No qualifications added</p>}
            </div>
          </div>
        )}

        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Total Earnings</h3>
              <p className="text-3xl font-bold text-gray-900">$0</p>
              <p className="text-sm text-gray-500 mt-2">Coming soon</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">This Month</h3>
              <p className="text-3xl font-bold text-gray-900">$0</p>
              <p className="text-sm text-gray-500 mt-2">Coming soon</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Pending</h3>
              <p className="text-3xl font-bold text-gray-900">$0</p>
              <p className="text-sm text-gray-500 mt-2">Coming soon</p>
            </div>
          </div>
        )}

        {/* Change Password Modal */}
        {showPasswordModal && (

          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">

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
                    onChange={(e) => setPasswordData(prev => ({
                      ...prev,
                      currentPassword: e.target.value
                    }))}
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
                    onChange={(e) => setPasswordData(prev => ({
                      ...prev,
                      newPassword: e.target.value
                    }))}
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
                    onChange={(e) => setPasswordData(prev => ({
                      ...prev,
                      confirmPassword: e.target.value
                    }))}
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