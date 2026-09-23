"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function addExpense(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const total = Number(formData.get("total"));
  const concepto = (formData.get("concepto") as string)?.trim();

  if (!total || total <= 0 || !concepto) return;

  await supabase.from("gastos").insert({
    total,
    concepto,
    user_id: user.id,
  });

  revalidatePath("/");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
