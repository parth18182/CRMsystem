import { Outlet } from "react-router-dom";

import AdminSidebar from "../AdminSidebar";
import { useSelector } from "react-redux";

function AdminDashboard() {

  const user = useSelector((state) => state.auth.currentUser);

  return (
    <div className="flex min-h-screen bg-[#0f0f1a]">

      <AdminSidebar />

      <div className="flex-1 overflow-y-auto">

        <div
          className="
          border-b border-white/10
          bg-white/5
          px-8 py-6
          flex justify-between items-center
        "
        >
          <div className="flex flex-col gap-y-2.5">
            <h1 className="text-3xl font-bold text-white">
              Admin Panel
            </h1>
            <p className="mt-1 text-sm text-white/40">
              Manage all CRM records
            </p>
          </div>
          <div
            className="
            rounded-xl
            bg-violet-500/10
            px-4 py-2
            text-violet-300
          "
          >
            👤 {user?.name}
          </div>
        </div>

        <div className="p-8">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;