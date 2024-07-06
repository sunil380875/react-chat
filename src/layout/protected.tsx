import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";

const Protectedroute = () => {
  const { isUserLoading, user } = useAuth();
  const [isDelayOver, setIsDelayOver] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsDelayOver(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  if (!isDelayOver) {
    return <div className="text-center h-screen">Loading...</div>;
  }
  console.log(isUserLoading, user);
  return user?.role === "APPLICANT" ? <Outlet /> : <Navigate to="/signin" />;
};

export default Protectedroute;
