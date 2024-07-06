import React from "react";
import Card from "./Card";
import useAuth from "../../hooks/useAuth";
export default function Dashboard() {
  const { user, isUserLoading } = useAuth();
  console.log(isUserLoading, user);
  return (
    <>
      <div className="flex flex-col px-20 justify-center items-center py-10">
        <div className="flex justify-center items-center">
          <div className="text-4xl font-bold my-5">
            DashBoard of {!user ? <>Loading...</> : <> {user?.name}</>}
          </div>
        </div>
        <div className="flex flex-wrap gap-5">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </>
  );
}
