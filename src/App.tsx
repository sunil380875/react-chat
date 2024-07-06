import { Routes, Route, useLocation } from "react-router-dom";
import { Signin, Dashboard } from "./components";
import useAuth from "./hooks/useAuth";
import { useEffect } from "react";
import { ProtectedRoute } from "./layout";
function App() {
  const location = useLocation();
  const { getUser } = useAuth();
  useEffect(() => {
    getUser();
  }, [location?.pathname, getUser]);
  console.log("Hello");
  return (
    <>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
