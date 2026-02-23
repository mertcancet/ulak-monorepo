import { redirect } from "react-router";
import { Welcome } from "../welcome/welcome";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export function loader() {
  throw redirect("/dashboard");
}

export default function Home() {
  return <Welcome />;
}
