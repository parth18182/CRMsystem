import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import InputField from "../reusablecompo/InputField";

import { signupUser, loginUser } from "../../redux/thunks/authThunk";

function AuthPage() {
  const [mode, setMode] = useState("login");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.currentUser);
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  console.log(import.meta.env.VITE_URL)

  const submit = async () => {
    if (!form.email || !form.password || (mode === "signup" && !form.name)) {
      setError("All fields are required");

      return;
    }

    if (mode === "signup") {
      const result = await dispatch(signupUser(form));

      console.log("result........", result)

      if (signupUser.fulfilled.match(result)) {
        setMode("login");

        setForm({
          name: "",
          email: "",
          password: "",
        });
        setError("");
      }
      if (signupUser.rejected.match(result)) {
        setError(result.payload);
      }
      return;
    }

    const result = await dispatch(loginUser(form));

    if (loginUser.fulfilled.match(result)) {
      localStorage.setItem('token', result.payload.token)
      navigate("/dashboard/form");
    }
    console.log('logged in user', user)
    if (loginUser.rejected.match(result)) {
      setError(result.payload);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0f0f1a] px-4">
      <div
        className=" w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-10 backdrop-blur-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">PharmaTrack CRM</h1>

          <p className="mt-2 text-sm text-white/40">
            Pharmacy Relationship Manager
          </p>
        </div>

        <div className="mb-6 flex rounded-xl bg-white/5 p-1">
          <button
            onClick={() => setMode("login")}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold ${mode === "login" ? "bg-violet-600 text-white" : "text-white/50"
              }`}
          >
            Login
          </button>

          <button
            onClick={() => setMode("signup")}
            className={`flex-1 rounded-lg py-2 text-sm font-semibold ${mode === "signup" ? "bg-violet-600 text-white" : "text-white/50"
              }`}
          >
            Signup
          </button>
        </div>

        <div className="space-y-4">
          {mode === "signup" && (
            <InputField
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
            />
          )}

          <InputField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="abc@gmail.com"
          />

          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="******"
          />
        </div>

        {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

        <button
          onClick={submit}
          disabled={loading}
          className=" mt-6 w-full cursor-pointer rounded-xl bg-violet-600 py-3 font-semibold text-white transition-all hover:bg-violet-700 disabled:opacity-50
        "
        >
          {loading
            ? "Please wait..."
            : mode === "login"
              ? "Login"
              : "Create Account"}
        </button>
      </div>
    </div>
  );
}

export default AuthPage;
