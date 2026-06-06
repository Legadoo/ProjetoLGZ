import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/session";

export default async function AdminPage() {
  await requireAdminUser();

  redirect("/admin/dashboard");
}