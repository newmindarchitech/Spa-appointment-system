import React from "react";

interface Appointment {
  id: number;
  client: string;
  service: string;
  date: string;
  time: string;
  status: "Scheduled" | "Completed" | "Cancelled";
}

const appointments: Appointment[] = [
  {
    id: 1,
    client: "John Doe",
    service: "Consultation",
    date: "March 5, 2026",
    time: "10:00 AM",
    status: "Scheduled",
  },
  {
    id: 2,
    client: "Sarah Smith",
    service: "Follow-up",
    date: "March 6, 2026",
    time: "2:30 PM",
    status: "Completed",
  },
  {
    id: 3,
    client: "Michael Brown",
    service: "Initial Meeting",
    date: "March 7, 2026",
    time: "11:15 AM",
    status: "Cancelled",
  },
];

const getBadgeClass = (status: Appointment["status"]) => {
  switch (status) {
    case "Scheduled":
      return "badge-primary";
    case "Completed":
      return "badge-success";
    case "Cancelled":
      return "badge-error";
    default:
      return "badge-ghost";
  }
};

const App=() => {
  return (
    <div className="min-h-screen bg-base-200">

      {/* Page Header */}
      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* Radial Statistics Section */}
      <div className="flex flex-col lg:flex-row gap-10 items-center justify-center w-full mb-10 bg-base-100 shadow rounded-box p-8">

        {/* Total */}
      <div className="text-center">
        <div
        className="radial-progress text-neutral"
        style={
          {
            "--value": 100,
            "--size": "6rem",
            "--thickness": "8px",
          } as React.CSSProperties
        }
      >
        {appointments.length}
      </div>
      <div className="mt-3 font-semibold">Total Appointments</div>
    </div>

    {/* Scheduled */}
    <div className="text-center">
      <div
        className="radial-progress text-primary"
        style={
          {
            "--value":
              appointments.length === 0
                ? 0
                : (appointments.filter(a => a.status === "Scheduled").length /
                    appointments.length) *
                  100,
            "--size": "6rem",
            "--thickness": "8px",
          } as React.CSSProperties
        }
      >
        {appointments.filter(a => a.status === "Scheduled").length}
      </div>
      <div className="mt-3 font-semibold">Scheduled</div>
    </div>

    {/* Completed */}
    <div className="text-center">
      <div
        className="radial-progress text-success"
        style={
          {
            "--value":
              appointments.length === 0
                ? 0
                : (appointments.filter(a => a.status === "Completed").length /
                    appointments.length) *
                  100,
            "--size": "6rem",
            "--thickness": "8px",
          } as React.CSSProperties
        }
      >
        {appointments.filter(a => a.status === "Completed").length}
      </div>
      <div className="mt-3 font-semibold">Completed</div>
    </div>

    {/* Cancelled */}
    <div className="text-center">
      <div
        className="radial-progress text-error"
        style={
          {
            "--value":
              appointments.length === 0
                ? 0
                : (appointments.filter(a => a.status === "Cancelled").length /
                    appointments.length) *
                  100,
            "--size": "6rem",
            "--thickness": "8px",
          } as React.CSSProperties
        }
      >
        {appointments.filter(a => a.status === "Cancelled").length}
      </div>
      <div className="mt-3 font-semibold">Cancelled</div>
    </div>

    </div>
      <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Your Appointments</h1>
      <a  href='/appointments/prepare-record' className="btn btn-primary">+ New Appointment</a>
    </div>

        {/* Appointments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="card bg-base-100 shadow-md transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] cursor-pointer"
            >
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <h2 className="card-title">{appointment.client}</h2>
                  <span
                    className={`badge ${getBadgeClass(
                      appointment.status
                    )}`}
                  >
                    {appointment.status}
                  </span>
                </div>

                <p className="text-sm opacity-70">
                  Service: {appointment.service}
                </p>

                <div className="mt-4">
                  <p>
                    <strong>Date:</strong> {appointment.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {appointment.time}
                  </p>
                </div>

                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-sm btn-outline">
                    View
                  </button>
                  <button className="btn btn-sm btn-secondary">
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;