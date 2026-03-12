"use client";

interface CancelDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  appointmentDetails: any;
}

export default function CancelDialog({ isOpen, onClose, onConfirm, appointmentDetails }: CancelDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-red-600">Cancel Appointment</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-gray-600">
            Are you sure you want to cancel this appointment? This action cannot be undone.
          </p>

          {appointmentDetails && (
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p className="text-sm">
                <span className="font-medium">Doctor:</span> {appointmentDetails.doctorName}
              </p>
              <p className="text-sm">
                <span className="font-medium">Date:</span>{' '}
                {new Date(appointmentDetails.appointmentDate).toLocaleDateString()}
              </p>
              <p className="text-sm">
                <span className="font-medium">Time:</span> {appointmentDetails.timeSlot}
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Keep Appointment
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Yes, Cancel Appointment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}