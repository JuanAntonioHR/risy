import { redirect } from "next/navigation";

export default function UserPage() {
  redirect("/users/home");
}