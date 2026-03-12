"use client";

import DashboardWrapper from '@/app/components/DashboardWrapper';

export default function VisitHistoryPage() {
  return (
    <DashboardWrapper requiredRole="patient">
      <h1 className="text-3xl font-bold">Visit History</h1>
      <p className="text-gray-600 mt-2">Your past medical visits</p>
    </DashboardWrapper>
  );
}