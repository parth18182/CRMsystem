import { useEffect, useState } from "react";

import {  useDispatch, useSelector } from "react-redux";

import { getEntries } from "../redux/thunks/entryThunk";

import Card from "./Card";

function Details() {
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.entries.entries);
  useEffect(() => {
    dispatch(getEntries());
  }, []);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const filteredEntries = entries?.filter(
    (entry) => {
      if (!entry) return false;

      const matchSearch =
        entry?.pharmacy
          ?.toLowerCase()
          ?.includes(
            search.toLowerCase()
          ) ||
        entry?.area
          ?.toLowerCase()
          ?.includes(
            search.toLowerCase()
          );

      const matchFilter =
        filter === "all" ||
        entry.status === filter;

      return (
        matchSearch &&
        matchFilter
      );
    }
  );

  return (
    <div>
      <div className="mb-6 flex gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="
          flex-1
          rounded-xl
          bg-white/5
          px-4 py-3
          text-white
        "
        />
        {["all", "accepted", "denied"].map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`
            rounded-xl
            text-white
            cursor-pointer
            px-4 py-2
            capitalize
            ${filter === item ? "bg-violet-600" : "bg-white/5"}
          `}
          >
            {item}
          </button>
        ))}
      </div>
      <div
        className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3"
      >
        {filteredEntries?.map((entry) => (
          <Card key={entry._id} entry={entry} />
        ))}
      </div>
    </div>
  );
}

export default Details;
