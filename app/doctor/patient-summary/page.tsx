"use client";

import DashboardWrapper from '@/app/components/DashboardWrapper';

export default function PatientSummaryPage() {
  return (
    <DashboardWrapper requiredRole="doctor">
      <h1 className="text-3xl font-bold">Patient Summary</h1>
      <p className="text-gray-600 mt-2">View patient summaries</p>
    </DashboardWrapper>
  );
}