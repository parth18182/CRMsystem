import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEntry, updateEntry } from "../redux/thunks/entryThunk";
import { clearSelectedEntry } from "../redux/slices/entrySlice";
import { useNavigate } from "react-router-dom";

function PharmacyForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedEntry = useSelector((state) => state.entries.selectedEntry);

  const emptyForm = {
    pharmacy: "",
    contact: "",
    person: "",
    status: "",
    remark: "",
    area: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [err, setErr] = useState(null);

  useEffect(() => {
    if (selectedEntry) {
      setForm(selectedEntry);
    }
  }, [selectedEntry]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async () => {
    if (form.pharmacy.length === 0 || form.contact.length === 0 || form.person.length === 0 || form.remark.length === 0 ||
      form.area.length === 0
    ) {
      setErr("All Fields are Required");
      setTimeout(() => {
        setErr("");
      }, 3000);

      return;
    }

    else if (form.status === "") {
      setErr("Select Status")
      setTimeout(() => {
        setErr("");
      }, 3000);
      return
    }

    else if (form.contact.length !== 10) {
      setErr('Phone Number Must Be 10 Digits Long')
      setTimeout(() => {
        setErr("");
      }, 3000);
      return
    }

    if (selectedEntry) {
      await dispatch(
        updateEntry({
          id: selectedEntry._id,
          updatedData: {
            status: form.status,

            remark: form.remark,
          },
        }),
      );
    } else {
      await dispatch(createEntry(form));
    }
    dispatch(clearSelectedEntry());

    navigate("/dashboard/details");
  };

  return (
    <div className="max-w-5xl mx-auto rounded-3xl border border-white/10 bg-white/5 p-8">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-white/70">
            Pharmacy Name
          </label>

          <input
            type="text"
            name="pharmacy"
            value={form.pharmacy}
            onChange={handleChange}
            disabled={selectedEntry}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white disabled:opacity-50"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/70">
            Contact Number
          </label>

          <input
            type="text"
            name="contact"
            value={form.contact}
            onChange={handleChange}
            disabled={selectedEntry}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white disabled:opacity-50"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/70">
            Contact Person
          </label>

          <input
            type="text"
            name="person"
            value={form.person}
            onChange={handleChange}
            disabled={selectedEntry}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white disabled:opacity-50"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/70">Status</label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
          >
            <option className="text-white bg-purple-800" value="">
              Select Status
            </option>
            <option className="text-white bg-purple-800" value="accepted">
              Accepted
            </option>
            <option className="text-white bg-purple-800" value="denied">
              Denied
            </option>
          </select>
        </div>
        <div>
          <label className="mb-2 block text-sm text-white/70">Area</label>
          <input
            type="text"
            name="area"
            value={form.area}
            disabled={selectedEntry}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white disabled:opacity-50"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block text-sm text-white/70">Remark</label>

          <textarea
            rows={4}
            name="remark"
            value={form.remark}
            onChange={handleChange}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white"
          />
        </div>
        {err && <p className="mt-3 text-sm text-red-500">{err}</p>}
        <div className="md:col-span-2">
          <button
            onClick={submit}
            className="w-full rounded-xl bg-violet-600 py-4 text-lg font-semibold text-white"
          >
            Save Entry
          </button>
        </div>
      </div>
    </div>
  );
}

export default PharmacyForm;
