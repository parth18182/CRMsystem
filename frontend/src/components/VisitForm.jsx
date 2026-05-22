import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";

import { createVisit } from "../redux/thunks/visitThunk";

function VisitForm() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { currententry } = useSelector((state) => state.entries);

  const { loading } = useSelector((state) => state.visit);

  const [error, setError] = useState("");

  const [form, setForm] = useState({
    phone: "",
    visitDate: "",
    visitTime: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });

    setError("");
  };

  const submit = async () => {
    if (form.phone.length === 0 || !form.visitDate || !form.visitTime) {
      setError("All fields required");
      return;
    }
    else if (!form.phone.length !== 10) {
      setError('Phone Number must Be 10 digits')
      return;
    }

    const result = await dispatch(
      createVisit({
        entryId: currententry._id,
        pharmacy: currententry.pharmacy,
        phone: form.phone,
        visitDate: form.visitDate,
        visitTime: form.visitTime,
      }),
    );

    if (createVisit.fulfilled.match(result)) {
      navigate("/dashboard/details");
    }
  };

  return (
    <div
      className="
      mx-auto
      max-w-xl
      rounded-3xl
      border
      border-cyan-500/20
      bg-white/5
      p-8
      backdrop-blur-xl
      "
    >
      <h1
        className="
        text-3xl
        font-bold
        text-white
        "
      >
        Schedule Visit
      </h1>

      <p
        className="
        mt-2
        text-cyan-300
        "
      >
        <span className="text-gray-500 text-sm">Pharmacy Name:</span> {currententry?.pharmacy}
      </p>

      <div
        className="
        mt-8
        space-y-5
        "
      >
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="
          w-full
          rounded-xl
          border
          border-white/10
          bg-white/5
          p-4
          text-white
          "
        />

        <input
          type="date"
          name="visitDate"
          value={form.visitDate}
          onChange={handleChange}
          className="
          w-full
          rounded-xl
          border
          border-white/10
          bg-white/5
          p-4
          text-white
          "
        />

        <select
          name="visitTime"
          value={form.visitTime}
          onChange={handleChange}
          className="
          w-full
          rounded-xl
          border
          border-white/10
          bg-[#15151d]
          p-4
          text-white
          "
        >
          <option value="">Select Visit Time</option>

          <option>9 AM - 11 AM</option>

          <option>11 AM - 1 PM</option>

          <option>2 PM - 4 PM</option>

          <option>4 PM - 6 PM</option>

          <option>6 PM - 8 PM</option>
        </select>

        {error && (
          <p
            className="
            text-red-400
            text-sm
            "
          >
            {error}
          </p>
        )}

        <button
          onClick={submit}
          disabled={loading}
          className="
          w-full
          rounded-xl
          bg-cyan-600
          py-4
          font-semibold
          text-white
          hover:bg-cyan-700
          "
        >
          {loading ? "Saving..." : "Save Visit"}
        </button>
      </div>
    </div>
  );
}

export default VisitForm;
