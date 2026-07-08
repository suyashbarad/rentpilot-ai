import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Buildings from "./pages/Buildings";
import Flats from "./pages/Flats";
import Tenants from "./pages/Tenants";
import Payments from "./pages/Payments";
import Complaints from "./pages/Complaints";
import Visitors from "./pages/Visitors";
import Notifications from "./pages/Notifications";
import Search from "./pages/Search";
import AI from "./pages/AI";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/buildings"
        element={
          <ProtectedRoute>
            <Buildings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/flats"
        element={
          <ProtectedRoute>
            <Flats />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tenants"
        element={
          <ProtectedRoute>
            <Tenants />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payments"
        element={
          <ProtectedRoute>
            <Payments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/complaints"
        element={
          <ProtectedRoute>
            <Complaints />
          </ProtectedRoute>
        }
      />

      <Route
        path="/visitors"
        element={
          <ProtectedRoute>
            <Visitors />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />

      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <Search />
          </ProtectedRoute>
        }
      />

      <Route
        path="/ai"
        element={
          <ProtectedRoute>
            <AI />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;