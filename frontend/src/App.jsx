import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import AuthPage from "./components/auth/AuthPage";
import Dashboard from "./components/pages/Dashboard";
import PharmacyForm from "./components/PharmacyForm";
import Details from "./components/Details";
import EntryDetails from "./components/EntryDetails";
import VisitForm from "./components/VisitForm";
import AdminDashboard from "./components/pages/AdminDashboard";
import AdminEntries from "./components/pages/AdminEntries";
import AdminVisits from "./components/pages/AdminVisits";

function App() {
  const user = useSelector((state) => state.auth.currentUser);

  console.log(
    "logged user:",
    user
  );

  return (
    <Routes>
      <Route path="/"
        element={
          user ? (
            user?.role ===
              "admin" ? (
              <Navigate
                to="/admin/entries"
              />
            ) : (
              <Navigate
                to="/dashboard/form"
              />
            )
          ) : (
            <AuthPage />
          )
        }
      />

      <Route
        path="/dashboard"
        element={
          user &&
            user?.role ===
            "user" ? (
            <Dashboard />
          ) : (
            <Navigate to="/" />
          )
        }
      >
        <Route
          path="form"
          element={
            <PharmacyForm />
          }
        />

        <Route
          path="details"
          element={<Details />}
        />

        <Route
          path="visitform"
          element={
            <VisitForm />
          }
        />

      </Route>

      <Route
        path="/entrydetails/:id"
        element={
          user ? (
            <EntryDetails />
          ) : (
            <Navigate to="/" />
          )
        }
      />

      <Route
        path="/admin"
        element={
          user &&
            user?.role ===
            "admin" ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/" />
          )
        }
      >
        <Route
          path="entries"
          element={
            <AdminEntries />
          }
        />

        <Route
          path="visits"
          element={
            <AdminVisits />
          }
        />
      </Route>

      <Route
        path="*"
        element={
          <Navigate to="/" />
        }
      />
    </Routes>
  );
}

export default App;