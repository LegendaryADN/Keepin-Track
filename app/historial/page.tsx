import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import HistorialClient from "./HistorialClient";

export default async function HistorialPage() {
  const supabase = await createClient();

  const { data: gastos } = await supabase
    .from("gastos")
    .select("id, total, concepto, fecha, created_at")
    .order("fecha", { ascending: false });

  return (
    <main className="min-h-screen bg-[#121212] px-6 py-8">
      <div className="mx-auto max-w-md">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-[#EDE0D3]">Historial</h1>
          <Link
            href="/"
            className="text-xs text-[#EDE0D3]/50 hover:text-[#EDE0D3] transition"
          >
            Volver a hoy
          </Link>
        </div>

        <HistorialClient gastos={gastos ?? []} />
      </div>
    </main>
  );
}
