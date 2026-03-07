export default function ServicesPage() {
  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-16 py-20 max-w-7xl mx-auto">

      {/* Page Title */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
        Our Digital Healthcare Services
      </h1>

      <p className="text-gray-600 text-center max-w-3xl mx-auto mb-14 text-sm sm:text-base">
        MediTech+ is a complete hospital management platform designed to
        simplify healthcare services for patients, doctors, and hospital staff.
        Our system helps reduce waiting time, improve communication, and provide
        quick access to medical services through a secure online dashboard.
      </p>

      {/* Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">

        {/* Service 1 */}
        <div className="bg-white p-6 sm:p-7 shadow-lg rounded-xl hover:shadow-xl transition transform hover:scale-105">
          <h2 className="font-semibold text-lg sm:text-xl mb-3 text-blue-600">
            Online Appointment Booking
          </h2>

          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            Patients can book appointments with doctors from home without
            standing in long queues. The system shows available time slots,
            helping patients select the best time for their visit and avoid
            unnecessary waiting at the hospital.
          </p>
        </div>

        {/* Service 2 */}
        <div className="bg-white p-6 sm:p-7 shadow-lg rounded-xl hover:shadow-xl transition transform hover:scale-105">
          <h2 className="font-semibold text-lg sm:text-xl mb-3 text-blue-600">
            Smart Patient Dashboard
          </h2>

          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            Each patient gets a personal dashboard where they can view
            appointment history, medical reports, prescriptions, and upcoming
            visits. This helps patients stay informed and manage their health
            records digitally.
          </p>
        </div>

        {/* Service 3 */}
        <div className="bg-white p-6 sm:p-7 shadow-lg rounded-xl hover:shadow-xl transition transform hover:scale-105">
          <h2 className="font-semibold text-lg sm:text-xl mb-3 text-blue-600">
            Digital Reports & Prescriptions
          </h2>

          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            Laboratory reports and doctor prescriptions are uploaded securely
            to the system. Patients can download them anytime, reducing the risk
            of losing paper documents and saving time during follow-up visits.
          </p>
        </div>

        {/* Service 4 */}
        <div className="bg-white p-6 sm:p-7 shadow-lg rounded-xl hover:shadow-xl transition transform hover:scale-105">
          <h2 className="font-semibold text-lg sm:text-xl mb-3 text-blue-600">
            Real-Time Notifications
          </h2>

          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            Patients receive instant notifications for appointment approvals,
            reschedules, test results, and important hospital announcements.
            This ensures that no important update is missed.
          </p>
        </div>

        {/* Service 5 */}
        <div className="bg-white p-6 sm:p-7 shadow-lg rounded-xl hover:shadow-xl transition transform hover:scale-105">
          <h2 className="font-semibold text-lg sm:text-xl mb-3 text-blue-600">
            Doctor & Staff Management
          </h2>

          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            Hospital administrators can manage doctors, nurses, and staff
            digitally. Schedules, departments, and roles are organized in one
            system, improving hospital efficiency and service quality.
          </p>
        </div>

        {/* Service 6 */}
        <div className="bg-white p-6 sm:p-7 shadow-lg rounded-xl hover:shadow-xl transition transform hover:scale-105">
          <h2 className="font-semibold text-lg sm:text-xl mb-3 text-blue-600">
            Reduced Waiting Time
          </h2>

          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            By using online booking and digital records, patients spend less
            time at reception desks and waiting areas. This creates a smoother
            hospital visit experience and improves patient satisfaction.
          </p>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="mt-20 bg-blue-50 p-8 sm:p-10 rounded-xl text-center">

        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          A Smarter Way to Access Healthcare
        </h2>

        <p className="text-gray-700 max-w-3xl mx-auto leading-relaxed text-sm sm:text-base">
          MediTech+ connects patients, doctors, and hospital staff on a single
          secure platform. From booking appointments to accessing medical
          records, every service is designed to save time, reduce stress, and
          improve the overall healthcare experience.
        </p>

      </div>

    </div>
  );
}