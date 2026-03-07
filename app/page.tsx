export default function HomePage() {
  return (
    <div className="min-h-screen">

      <section className="bg-blue-100 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to MediTech+
        </h1>

        <p className="text-gray-700 max-w-2xl mx-auto">
          We provide world-class medical services with experienced doctors
          and modern facilities.
        </p>
      </section>

      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          About Us
        </h2>

        <p className="text-gray-600 text-center">
          Our Patient Dashboard is designed to provide a seamless and convenient healthcare experience.
          Patients can easily book, view, and manage their medical appointments with preferred doctors and departments.
          The dashboard allows secure access to personal medical records, prescriptions, and test reports anytime.
          Users can receive real-time notifications for appointment updates, reminders, and important announcements.
          Patients can communicate with healthcare staff through secure messaging and support features.
          With an intuitive and user-friendly interface, the dashboard ensures quick access to essential healthcare services and information.
        </p>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-6">

          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold text-xl mb-2">24/7 Emergency</h3>
            <p className="text-gray-600">
              Emergency services available all day.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold text-xl mb-2">Expert Doctors</h3>
            <p className="text-gray-600">
              Highly qualified medical staff.
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow">
            <h3 className="font-semibold text-xl mb-2">Modern Labs</h3>
            <p className="text-gray-600">
              Advanced diagnostic facilities.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}