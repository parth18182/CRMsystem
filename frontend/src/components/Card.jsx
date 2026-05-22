import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setSelectedEntry, showentry } from "../redux/slices/entrySlice";

function Card({ entry }) {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const isAccepted = entry.status === "accepted";

  const handleEdit = () => {
    dispatch(setSelectedEntry(entry));

    navigate("/dashboard/form");
  };

  const handleVisit = () => {
    dispatch(showentry(entry));

    navigate("/dashboard/visitform");
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 transition-all hover:border-violet-500/30 hover:bg-white/[0.07]">
      <div className="mb-5 flex items-start justify-between">
        <div
          className="cursor-pointer"
          onClick={() => {
            dispatch(showentry(entry));

            navigate(`/entrydetails/${entry._id}`);
          }}
        >
          <h2 className="text-xl font-bold text-white">{entry.pharmacy}</h2>

          <p className="mt-1 text-sm text-white/40">📍 {entry.area}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleVisit}
            className="
            rounded-xl
            border
            border-cyan-500/20
            bg-cyan-500/10
            px-3
            py-1.5
            text-sm
            font-semibold
            text-cyan-300
            cursor-pointer
            transition-all
            hover:bg-cyan-500/20
            "
          >
            Visit 📍
          </button>

          <button
            onClick={handleEdit}
            className="
            rounded-xl
            border
            border-violet-500/20
            bg-violet-500/10
            px-3
            py-1.5
            text-sm
            font-semibold
            text-violet-300
            cursor-pointer
            transition-all
            hover:bg-violet-500/20
            "
          >
            Edit ✏️
          </button>

          <span
            className={`
            rounded-full
            px-3
            py-1
            text-xs
            font-semibold
            ${
              isAccepted
                ? "bg-green-500/20 text-green-400"
                : "bg-red-500/20 text-red-400"
            }
            `}
          >
            {isAccepted ? "Accepted" : "Denied"}
          </span>

          <button
            onClick={() => setOpen(!open)}
            className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-full
            bg-white/10
            text-white
            transition-all
            hover:bg-white/20
            "
          >
            <span
              className={`
              transition-transform
              duration-300
              ${open ? "rotate-180" : ""}
              `}
            >
              ▼
            </span>
          </button>
        </div>
      </div>
      {open && (
        <div
          className="
          mt-5
          space-y-4
          border-t
          border-white/10
          py-4
          text-sm
          text-white/70
          "
        >
          <div className="flex gap-3">
            <span>👤</span>
            <div>
              <p className="text-xs text-white/40">CONTACT PERSON</p>
              <p>{entry.person}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span>📞</span>
            <div>
              <p className="text-xs text-white/40">CONTACT NUMBER</p>
              <p>{entry.contact}</p>
            </div>
          </div>

          <div>
            <p className="text-xs text-white/40">Latest Remark</p>
            <div className="mt-2">
              <div
                className="
                rounded-lg
                bg-white/5
                p-2
                "
              >
                <p>💬 {entry?.remarks?.[0]?.text || "no remark"}</p>
                <p className="mt-1 text-xs text-white/40">
                  {entry?.remarks?.[0]?.createdAt
                    ? new Date(entry.remarks[0].createdAt).toLocaleString()
                    : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className="
        border-t
        border-white/10
        pt-3
        text-sm
        text-white/40
        "
      >
        🕒 {new Date(entry.createdAt).toLocaleString()}
      </div>
    </div>
  );
}
export default Card;