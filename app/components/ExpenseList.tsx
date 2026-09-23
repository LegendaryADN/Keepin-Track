type Gasto = {
  id: string;
  total: number;
  concepto: string;
  created_at: string;
};

export default function ExpenseList({ gastos }: { gastos: Gasto[] }) {
  if (gastos.length === 0) {
    return (
      <p className="mt-8 text-center text-sm text-[#EDE0D3]/40">
        Aún no registras gastos hoy.
      </p>
    );
  }

  return (
    <ul className="mt-8 space-y-2">
      {gastos.map((g) => (
        <li
          key={g.id}
          className="flex items-center justify-between rounded-lg bg-[#2E1B18]/60 px-4 py-3"
        >
          <div>
            <p className="text-[#EDE0D3]">{g.concepto}</p>
            <p className="text-xs text-[#EDE0D3]/40">
              {new Date(g.created_at).toLocaleTimeString("es-MX", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
          <p className="font-medium text-[#DD4F44]">
            -${Number(g.total).toFixed(2)}
          </p>
        </li>
      ))}
    </ul>
  );
}
