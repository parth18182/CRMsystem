import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { changeVisitStatus, getAllVisits } from "../../redux/thunks/adminThunk";

function AdminVisits() {
  const dispatch = useDispatch();

  const { allVisits, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllVisits());
  }, []);

  if (loading) {
    return <div className="text-white text-center mt-20">Loading...</div>;
  }

  return (
    <div>
      <h1 className=" mb-8 text-3xl font-bold text-white">
        {allVisits.length !== 0 ? "All Visits" : "No Visits"}
      </h1>

      <div className=" grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {allVisits?.map((visit) => (
          <div
            key={visit._id}
            className=" rounded-3xl border border-cyan-500/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-cyan-500/30 "
          >
            <div className=" mb-5 flex items-center justify-between ">
              {console.log('pharmacy name',visit.entry.pharmacy)}
              <div>
                <h2 className=" text-xl font-bold text-white">
                  🏥 {visit.entry.pharmacy}
                </h2>
                <p className=" mt-1 text-xs text-white/40">Visit Request</p>
              </div>
              <div>
                <select
                  value={visit.visitStatus}
                  onChange={(e) =>
                    dispatch(
                      changeVisitStatus({
                        id: visit._id,
                        visitStatus: e.target.value,
                      }),
                    )
                  }
                  className={`rounded-xl px-4 py-2 text-sm font-semibold outline-none border
                      ${visit.visitStatus === "completed"
                      ? "bg-green-500/10 text-green-400 border-green-500/20"
                      : visit.visitStatus === "cancelled"
                        ? "bg-red-500/10 text-red-400 border-red-500/20"
                        : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                    }`}
                >
                  <option
                    value="pending"
                    className="bg-[#1a1a25]"
                  >
                    Pending
                  </option>

                  <option
                    value="completed"
                    className="bg-[#1a1a25]"
                  >
                    Completed
                  </option>

                  <option
                    value="cancelled"
                    className="bg-[#1a1a25]"
                  >
                    Cancelled
                  </option>
                </select>
              </div>
            </div>
            <div className="space-y-4 rounded-2xl bg-white/3 p-4 text-sm text-white/80">
              <div className="flex items-center gap-3">
                <span className="w-28 text-cyan-400 font-medium">📞 Phone</span>

                <span className="text-white/90">{visit.phone}</span>
              </div>

              <div className="h-px bg-white/5" />

              <div className="flex items-center gap-3">
                <span className="w-28 text-cyan-400 font-medium">📅 Date</span>

                <span className="text-white/90">
                  {new Date(visit.visitDate).toDateString()}
                </span>
              </div>

              <div className="h-px bg-white/5" />

              <div className="flex items-center gap-3">
                <span className="w-28 text-cyan-400 font-medium">⏰ Time</span>

                <span className="text-white/90">{visit.visitTime}</span>
              </div>
            </div>

            <div className="mt-5 border-t border-white/10 pt-3 text-xs text-white/40">
              Created: {new Date(visit.createdAt).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminVisits;
