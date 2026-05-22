import { useNavigate, useLocation } from "react-router-dom";

import { useDispatch } from "react-redux";

import { logout } from "../redux/slices/authSlice";
import { clearSelectedEntry } from "../redux/slices/entrySlice";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  return (
    <div
      className="w-64 border-r border-white/10 bg-[#11111d]
      p-5
      flex
      flex-col
      justify-between
    "
    >
      <div className="flex flex-col">
        <h1 className=" mb-10 text-2xl font-serif self-center text-white shadow-md rounded-2xl p-1.5 shadow-purple-600">
          CRM Dashboard
        </h1>
        <div className="flex flex-col gap-3">
          <button
            onClick={() => {navigate("/dashboard/form"),dispatch(clearSelectedEntry())}}
            className={
              location.pathname === "/dashboard/form"
                ? "bg-violet-600 p-3 rounded-xl text-white"
                : "cursor-pointer bg-white/5 p-3 rounded-xl text-white"
            }
          >
            📋 Add Entry
          </button>
          <button
            onClick={() => navigate("/dashboard/details")}
            className={
              location.pathname === "/dashboard/details"
                ? "bg-violet-600 p-3 rounded-xl text-white"
                :  "cursor-pointer bg-white/5 p-3 rounded-xl text-white"
            }
          >
            🗂 Records
          </button>
        </div>
      </div>

      <button
        className="text-white p-3 cursor-pointer border border-purple-600 rounded-2xl transition duration-300 ease-in-out hover:scale-110 hover:bg-purple-600 hover:text-white hover:border-purple-900"
        onClick={() => {
          dispatch(logout());

          localStorage.removeItem("token");

          navigate("/");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
