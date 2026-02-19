import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div>
      <div>Auth Layout</div>
      <Outlet />
    </div>
  );
}
