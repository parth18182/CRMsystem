import { NavLink, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";


function AdminSidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout =() => {dispatch(logout());
      localStorage.removeItem("token");
      navigate("/");
    };

  return (
    <div className=" flex h-screen flex-col w-72 border-r border-white/10 bg-white/5 p-5">
      <div>
        <h1 className="mb-10 text-2xl font-bold text-white">
          👑 Admin CRM
        </h1>
        <div className="space-y-3">
          <NavLink
            to="/admin/entries"
            className={({ isActive }) =>
              `block rounded-xl px-4 py-3 ${isActive? "bg-violet-600 text-white": "bg-white/5 text-white/60"}`}>
            📦All Entries
          </NavLink>

          <NavLink
            to="/admin/visits"
            className={({ isActive }) =>
              `block rounded-xl px-4 py-3
              ${isActive
                ? "bg-violet-600 text-white"
                : "bg-white/5 text-white/60"
              }`
            }
          >
            🚗 Visits
          </NavLink>
        </div>
      </div>
      <button
        onClick={
          handleLogout
        }
        className=" mt-auto rounded-xl text-center bg-red-500/20 px-4 py-3 cursor-pointer text-red-400 transition-all hover:bg-red-500/30">
        Logout
      </button>

    </div>
  );
}

export default AdminSidebar;