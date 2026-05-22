import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllEntries } from "../../redux/thunks/adminThunk";

function AdminEntries() {
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.admin.allEntries);

  useEffect(() => {
    dispatch(getAllEntries());
  }, []);

  return (
    <div className=" h-175 px-6 py-8">
      <h1 className="mb-6 text-2xl font-bold text-violet-100">
        {entries.length !== 0 ? "All Pharmacy Entries" : "No Entries Found"}
      </h1>
      <div
        className="max-h-[70vh] space-y-4 overflow-y-auto
          [&::-webkit-scrollbar]:w-1.5
          [&::-webkit-scrollbar-track]:bg-white/5
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-violet-600">
        {entries?.map((entry) => (
          <div
            key={entry._id}
            className="rounded-xl border border-violet-500/20 bg-violet-950/30 p-5 hover:border-violet-500/40 hover:bg-violet-950/50 transition-colors duration-200"
          >
              <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">{entry.pharmacy}</h2>
                <p className="mt-1 text-sm text-violet-300/60">📍 {entry.area}</p>
              </div>

              <span
                className={`rounded-lg px-3 py-1 text-xs font-semibold border ${
                  entry.status === "accepted"
                    ? "border-green-500/30 bg-green-500/10 text-green-400"
                    : "border-red-500/30 bg-red-500/10 text-red-400"
                }`}
              >
                {entry.status === "accepted" ? "Accepted" : "Denied"}
              </span>
            </div>
            <div className="my-4 h-px bg-violet-500/15" />
            <div className="space-y-1.5 text-sm text-white/60">
              <p>👤 {entry.user?.name}</p>
              <p>📧 {entry.user?.email}</p>
              <p>📞 {entry.contact}</p>
              <p>🪪 {entry.person}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminEntries;