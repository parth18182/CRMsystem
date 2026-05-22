import React from "react";
import { useSelector } from "react-redux";

const EntryDetails = () => {
  const { currententry } = useSelector((state) => state.entries);

  if (!currententry) {
    return (
      <div
        className="
        flex h-[70vh]
        items-center justify-center
        rounded-3xl
        border border-violet-500/10
        bg-linear-to-br from-violet-950/40 to-purple-950/40
        text-violet-300/50
        backdrop-blur-sm  
      "
      >
        No Entry Selected
      </div>
    );
  }
  const isAccepted = currententry.status === "accepted";
  return (
    <div className="space-y-6 bg-gray-800 h-screen w-screen mx-auto p-4">
      <div
        className="
        rounded-3xl
        border border-violet-500/20
        bg-linear-to-r from-violet-950/60 via-purple-700 to-violet-950/60
        p-8
        shadow-lg shadow-violet-950/50
      "
      >
        <div className="flex flex-wrap items-start justify-between gap-5">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white drop-shadow-sm">
              {currententry.pharmacy}
            </h1>
            <p className="mt-2 flex items-center gap-1.5 text-violet-300/60">
              <span>📍</span> {currententry.area}
            </p>
          </div>
          <span
            className={`
            rounded-full
            px-5 py-2
            text-sm font-semibold
            shadow-inner
            ${isAccepted
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
              }
          `}
          >
            {isAccepted ? "Accepted" : "Denied"}
          </span>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div
          className="
          rounded-3xl
          border border-violet-500/10
          bg-purple-800
          p-6
          backdrop-blur-sm
        "
        >
          <h2 className="mb-6 text-xl font-bold text-violet-100 tracking-wide border-b border-violet-500/10 pb-3">
            Contact Information
          </h2>

          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold tracking-wider text-violet-400/70 uppercase">
                Contact Person
              </p>
              <p className="mt-1.5 flex items-center gap-2 text-white">
                <span className="text-violet-400">👤</span> {currententry.person}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-wider text-violet-400/70 uppercase">
                Phone Number
              </p>
              <p className="mt-1.5 flex items-center gap-2 text-white">
                <span className="text-violet-400">📞</span> {currententry.contact}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-wider text-violet-400/70 uppercase">
                Created
              </p>
              <p className="mt-1.5 flex items-center gap-2 text-white">
                <span className="text-violet-400">🕒</span>{" "}
                {new Date(currententry.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* REMARK HISTORY */}
        <div
          className="
          rounded-3xl
          border border-violet-500/10
          bg-purple-950
          p-6
          backdrop-blur-sm
        "
        >
          <h2 className="mb-6 text-xl font-bold text-violet-100 tracking-wide border-b border-violet-500/10 pb-3">
            Remark History
          </h2>

          {!currententry.remarks?.length ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <span className="text-2xl mb-2">💬</span>
              <p className="text-violet-300/40 text-sm">No remarks found</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-80  overflow-y-auto pr-2 custom-scrollbar">
              {console.log(currententry.remarks)}

              {currententry.remarks.map((item, index) => (

                <div
                  key={index}
                  className="rounded-2xl border border-violet-500/10 bg-purple-950 p-4 transition-all duration-200 hover:border-violet-500/20">
                  <p className="text-white/90 text-sm leading-relaxed">
                    <span className="text-violet-400 mr-1.5">💬</span>
                    {item.text}
                  </p>
                  <p className="mt-2.5 text-[11px] text-white text-right font-medium">
                    {new Date(item.createdAt).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default EntryDetails;