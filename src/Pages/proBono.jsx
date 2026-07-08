import React, { useState } from "react";

export default function AdminDashboard() {
  // Mock data for lawyers awaiting bar verification
  const [pendingLawyers, setPendingLawyers] = useState([
    {
      id: 1,
      name: "Alice Smith, Esq.",
      email: "alice@smithlaw.com",
      jurisdiction: "New York",
      barNumber: "NY-884920",
    },
    {
      id: 2,
      name: "Robert Chen",
      email: "bchen@defenselegal.org",
      jurisdiction: "California",
      barNumber: "CA-102948",
    },
  ]);

  // Mock data for the pro bono matters pool
  const [matters, setMatters] = useState([
    {
      id: 101,
      title: "Eviction Defense Assistance",
      category: "Housing",
      status: "Unassigned",
      lawyer: "None",
    },
    {
      id: 102,
      title: "Asylum Application Filing",
      category: "Immigration",
      status: "Assigned",
      lawyer: "Jane Doe, Esq.",
    },
    {
      id: 103,
      title: "Veterans Benefits Appeal",
      category: "Military/Gov",
      status: "Unassigned",
      lawyer: "None",
    },
  ]);

  // Handle approving a lawyer (removes from list in UI)
  const handleApprove = (id) => {
    // This will hit your Node/Express API patch endpoint later
    setPendingLawyers(pendingLawyers.filter((lawyer) => lawyer.id !== id));
    alert(`Lawyer approved! Status updated in database.`);
  };

  // Handle rejecting a lawyer
  const handleReject = (id) => {
    setPendingLawyers(pendingLawyers.filter((lawyer) => lawyer.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-blue-950 text-white flex flex-col hidden md:flex">
        <div className="p-6 border-b border-blue-900">
          <h1 className="text-xl font-bold tracking-wide">Pro Bono Admin</h1>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <a
            href="#dashboard"
            className="block px-4 py-2.5 rounded bg-blue-900 font-medium text-sm"
          >
            Dashboard
          </a>
          <a
            href="#matters"
            className="block px-4 py-2.5 rounded text-gray-300 hover:bg-blue-900 text-sm transition"
          >
            Manage Matters
          </a>
          <a
            href="#lawyers"
            className="block px-4 py-2.5 rounded text-gray-300 hover:bg-blue-900 text-sm transition"
          >
            Lawyer Directory
          </a>
        </nav>
        <div className="p-4 border-t border-blue-900 text-xs text-blue-300 text-center">
          Logged in as System Admin
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        {/* Welcome Header */}
        <header className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Command Center</h2>
          <p className="text-sm text-gray-600 mt-1">
            Review pending attorney verifications and assign open pro bono
            files.
          </p>
        </header>

        {/* SECTION 1: Pending Lawyer Verifications */}
        <section className="mb-10 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800 flex items-center gap-2">
              🛡️ Pending Lawyer Verifications
              <span className="bg-blue-100 text-blue-800 text-xs px-2.5 py-0.5 rounded-full font-bold">
                {pendingLawyers.length}
              </span>
            </h3>
          </div>

          {pendingLawyers.length === 0 ? (
            <div className="p-8 text-center text-gray-500 text-sm">
              ✨ All volunteer applications have been processed! No pending
              accounts.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-400 uppercase text-xs tracking-wider border-b border-gray-200">
                    <th className="px-6 py-3 font-semibold">
                      Attorney Details
                    </th>
                    <th className="px-6 py-3 font-semibold">Jurisdiction</th>
                    <th className="px-6 py-3 font-semibold">Bar Number</th>
                    <th className="px-6 py-3 font-semibold text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                  {pendingLawyers.map((lawyer) => (
                    <tr key={lawyer.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">
                          {lawyer.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {lawyer.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-600">
                        {lawyer.jurisdiction}
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-mono bg-gray-100 text-gray-800 px-2 py-0.5 rounded border text-xs">
                          {lawyer.barNumber}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => handleReject(lawyer.id)}
                          className="px-3 py-1.5 border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 rounded text-xs font-medium transition"
                        >
                          Deny
                        </button>
                        <button
                          onClick={() => handleApprove(lawyer.id)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-medium shadow-sm transition"
                        >
                          Approve Lawyer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* SECTION 2: Matters Management Pool */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
            <h3 className="font-semibold text-gray-800">
              📂 Active Pro Bono Matters Pool
            </h3>
            <button className="px-3 py-1.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-medium rounded shadow transition">
              + Intake New Matter
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-400 uppercase text-xs tracking-wider border-b border-gray-200">
                  <th className="px-6 py-3 font-semibold">
                    Case Reference / Title
                  </th>
                  <th className="px-6 py-3 font-semibold">Category</th>
                  <th className="px-6 py-3 font-semibold">Status</th>
                  <th className="px-6 py-3 font-semibold">Assigned Counsel</th>
                  <th className="px-6 py-3 font-semibold text-right">
                    Allocation
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {matters.map((matter) => (
                  <tr key={matter.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">
                        {matter.title}
                      </div>
                      <div className="text-xs text-gray-400">
                        ID: #{matter.id}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-0.5 text-xs rounded bg-blue-50 text-blue-700 font-medium">
                        {matter.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                          matter.status === "Unassigned"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-indigo-100 text-indigo-800"
                        }`}
                      >
                        • {matter.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-medium">
                      {matter.lawyer}
                    </td>
                    <td className="px-6 py-4 text-right">
                      {matter.status === "Unassigned" ? (
                        <button className="px-3 py-1 bg-white border border-gray-300 hover:border-blue-900 hover:text-blue-900 rounded text-xs font-medium transition shadow-sm">
                          Assign Counsel
                        </button>
                      ) : (
                        <button className="px-3 py-1 bg-gray-50 text-gray-400 border border-gray-200 rounded text-xs font-medium cursor-not-allowed">
                          Reassign
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
