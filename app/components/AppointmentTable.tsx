"use client";

interface Appointment {
  id: string;
  doctorName: string;
  doctorSpecialty: string;
  appointmentDate: string;
  timeSlot: string;
  reason: string;
  urgent: boolean;
  status: string;
  createdAt: string;
}

interface AppointmentTableProps {
  appointments: Appointment[];
  onView: (appointment: Appointment) => void;
  onEdit: (appointment: Appointment) => void;
  onDelete: (id: string) => void;
  getStatusBadge: (status: string) => string;
}

export default function AppointmentTable({
  appointments,
  onView,
  onEdit,
  onDelete,
  getStatusBadge
}: AppointmentTableProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden w-full">

      <table className="min-w-full w-full table-fixed divide-y divide-gray-200">
        <thead className="bg-blue-600">
          <tr>
            <th className="px-6 py-3 text-xs font-medium text-white uppercase">
              Doctor
            </th>
            <th className="px-6 py-3  text-xs font-medium text-white uppercase tracking-wider">
              Date & Time
            </th>
            <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">
              Reason
            </th>
            <th className="px-6 py-3  text-xs font-medium text-white uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-xs font-medium text-white uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {appointments.length === 0 ? (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-left text-gray-500">
                No appointments found
              </td>
            </tr>
          ) : (
            appointments.map((appointment) => (
              <tr key={appointment.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  <div className="font-medium text-gray-900">{appointment.doctorName}</div>
                  <div className="text-sm text-gray-500">{appointment.doctorSpecialty}</div>
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {new Date(appointment.appointmentDate).toLocaleDateString()}
                  </div>
                  <div className="text-sm text-gray-500">{appointment.timeSlot}</div>
                </td>
                <td className="px-6 py-4 text-center">
                  <div className="text-sm text-gray-900">{appointment.reason}</div>
                  {appointment.urgent && (
                    <span className="text-xs text-red-600 font-medium">Urgent</span>
                  )}
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusBadge(appointment.status)}`}>
                    {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-3 justify-center">
                    {/* View Icon */}
                    <button
                      onClick={() => onView(appointment)}
                      title="View"
                      className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-100 transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </button>

                    {/* Edit Icon */}
                    {appointment.status === "pending" && (
                      <button
                        onClick={() => onEdit(appointment)}
                        title="Edit"
                        className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-100 transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1-4l-7 7"
                          />
                        </svg>
                      </button>
                    )}

                    {/* Delete Icon */}
                    {appointment.status === "pending" && (
                      <button
                        onClick={() => onDelete(appointment.id)}
                        title="Delete"
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-100 transition"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M10 11h4m-4 4h4"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4 7h16M10 4h4v3H10V4z"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}