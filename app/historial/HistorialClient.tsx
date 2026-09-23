"use client";

import { useMemo, useState } from "react";

type Gasto = {
  id: string;
  total: number;
  concepto: string;
  fecha: string; // 'YYYY-MM-DD'
  created_at: string;
};

type Group = {
  key: string;
  label: string;
  total: number;
  gastos: Gasto[];
};

function startOfWeek(date: Date) {
  const d = new Date(date);
  const day = d.getDay(); // 0 = domingo
  const diff = (day === 0 ? -6 : 1) - day; // lunes como inicio de semana
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatWeekLabel(start: Date) {
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  const fmt = (d: Date) =>
    d.toLocaleDateString("es-MX", { day: "numeric", month: "short" });
  return `${fmt(start)} – ${fmt(end)}`;
}

function groupByWeek(gastos: Gasto[]): Group[] {
  const map = new Map<string, Group>();
  for (const g of gastos) {
    const fecha = new Date(g.fecha + "T00:00:00");
    const weekStart = startOfWeek(fecha);
    const key = weekStart.toISOString().slice(0, 10);
    if (!map.has(key)) {
      map.set(key, {
        key,
        label: formatWeekLabel(weekStart),
        total: 0,
        gastos: [],
      });
    }
    const group = map.get(key)!;
    group.total += Number(g.total);
    group.gastos.push(g);
  }
  return Array.from(map.values()).sort((a, b) => (a.key < b.key ? 1 : -1));
}

function groupByMonth(gastos: Gasto[]): Group[] {
  const map = new Map<string, Group>();
  for (const g of gastos) {
    const fecha = new Date(g.fecha + "T00:00:00");
    const key = `${fecha.getFullYear()}-${String(
      fecha.getMonth() + 1
    ).padStart(2, "0")}`;
    if (!map.has(key)) {
      const label = fecha.toLocaleDateString("es-MX", {
        month: "long",
        year: "numeric",
      });
      map.set(key, {
        key,
        label: label.charAt(0).toUpperCase() + label.slice(1),
        total: 0,
        gastos: [],
      });
    }
    const group = map.get(key)!;
    group.total += Number(g.total);
    group.gastos.push(g);
  }
  return Array.from(map.values()).sort((a, b) => (a.key < b.key ? 1 : -1));
}

export default function HistorialClient({ gastos }: { gastos: Gasto[] }) {
  const [tab, setTab] = useState<"semana" | "mes">("semana");
  const [openKey, setOpenKey] = useState<string | null>(null);

  const groups = useMemo(
    () => (tab === "semana" ? groupByWeek(gastos) : groupByMonth(gastos)),
    [tab, gastos]
  );

  return (
    <div>
      <div className="mb-6 flex gap-2 rounded-lg bg-[#2E1B18] p-1">
        {(["semana", "mes"] as const).map((t) => (
          <button
            key={t}
            onClick={() => {
              setTab(t);
              setOpenKey(null);
            }}
            className={`flex-1 rounded-md py-2 text-sm font-medium transition ${
              tab === t
                ? "bg-[#DD4F44] text-[#121212]"
                : "text-[#EDE0D3]/60 hover:text-[#EDE0D3]"
            }`}
          >
            {t === "semana" ? "Por semana" : "Por mes"}
          </button>
        ))}
      </div>

      {groups.length === 0 ? (
        <p className="text-center text-sm text-[#EDE0D3]/40">
          Aún no hay gastos registrados.
        </p>
      ) : (
        <div className="space-y-2">
          {groups.map((g) => (
            <div
              key={g.key}
              className="rounded-lg border border-[#55241F] bg-[#2E1B18]/60"
            >
              <button
                onClick={() => setOpenKey(openKey === g.key ? null : g.key)}
                className="flex w-full items-center justify-between px-4 py-3 text-left"
              >
                <span className="text-[#EDE0D3]">{g.label}</span>
                <span className="font-medium text-[#DD4F44]">
                  -${g.total.toFixed(2)}
                </span>
              </button>

              {openKey === g.key && (
                <ul className="space-y-1.5 border-t border-[#55241F] px-4 py-3">
                  {g.gastos
                    .slice()
                    .sort((a, b) => (a.fecha < b.fecha ? 1 : -1))
                    .map((gasto) => (
                      <li
                        key={gasto.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-[#EDE0D3]/80">
                          {gasto.concepto}{" "}
                          <span className="text-[#EDE0D3]/40">
                            (
                            {new Date(
                              gasto.fecha + "T00:00:00"
                            ).toLocaleDateString("es-MX", {
                              day: "numeric",
                              month: "short",
                            })}
                            )
                          </span>
                        </span>
                        <span className="text-[#DD4F44]/90">
                          -${Number(gasto.total).toFixed(2)}
                        </span>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
