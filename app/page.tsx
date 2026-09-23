import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import LogoutButton from "./components/LogoutButton";

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const nombre = (user?.user_metadata?.nombre as string) ?? "";
  const hoy = new Date().toISOString().slice(0, 10);

  const { data: gastos } = await supabase
    .from("gastos")
    .select("id, total, concepto, created_at")
    .eq("fecha", hoy)
    .order("created_at", { ascending: false });

  const totalHoy = (gastos ?? []).reduce(
    (acc, g) => acc + Number(g.total),
    0
  );

  return (
    <main className="min-h-screen bg-[#121212] px-6 py-8">
      <div className="mx-auto max-w-md">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm text-[#D9A79A]">Hola, {nombre}</p>
            <h1 className="text-2xl font-semibold text-[#EDE0D3]">Hoy</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/historial"
              className="text-xs text-[#EDE0D3]/50 hover:text-[#EDE0D3] transition"
            >
              Historial
            </Link>
            <LogoutButton />
          </div>
        </div>

        <div className="mb-6 rounded-xl border border-[#55241F] bg-[#2E1B18] px-5 py-4">
          <p className="text-sm text-[#EDE0D3]/60">Gastado hoy</p>
          <p className="text-3xl font-bold text-[#DD4F44]">
            ${totalHoy.toFixed(2)}
          </p>
        </div>

        <ExpenseForm />

        <ExpenseList gastos={gastos ?? []} />
      </div>
    </main>
  );
}
