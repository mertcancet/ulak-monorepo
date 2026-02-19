import React from "react";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div>
      <div>Dashboard Layout</div>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
