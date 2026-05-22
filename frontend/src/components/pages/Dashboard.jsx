import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Sidebar from "../Sidebar";

function Dashboard() {
  const location = useLocation();
  const user = useSelector((state) => state.auth.currentUser);
  const entries = useSelector((state) => state.entries.entries);
  const selectedEntry = useSelector((state) => state.entries.selectedEntry);
  const isFormPage =location.pathname === "/dashboard/form";

  return (
    <div className="flex min-h-screen bg-[#0f0f1a]">
      <Sidebar />
      <div className="flex-1">
        <div
          className="
          flex items-center justify-between
          border-b border-white/10
          bg-white/5 px-8 py-5"
        >
          <div>
            <h1 className="text-2xl font-bold text-white">
              {isFormPage
                ? selectedEntry
                  ? "Update Pharmacy Status"
                  : "New Pharmacy Entry"
                : "Saved Records"}
            </h1>

            <p className="text-sm text-white/40">
              {isFormPage
                ? selectedEntry
                  ? "Only status & remark editable"
                  : "Fill pharmacy details"
                : `${entries?.length} records found`}
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

export default Dashboard;