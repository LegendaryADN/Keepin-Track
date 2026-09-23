import { signIn } from "./actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#121212] px-6">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="text-sm tracking-wide text-[#D9A79A] mb-1">
            Keepin&apos; Track
          </p>
          <h1 className="text-3xl font-semibold text-[#EDE0D3]">
            Bienvenido de vuelta
          </h1>
        </div>

        <form action={signIn} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm text-[#EDE0D3]/70 mb-1.5"
            >
              Correo
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-lg bg-[#2E1B18] border border-[#55241F] px-4 py-2.5 text-[#EDE0D3] placeholder:text-[#EDE0D3]/30 outline-none focus:border-[#DD4F44] transition-colors"
              placeholder="tu@correo.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm text-[#EDE0D3]/70 mb-1.5"
            >
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="w-full rounded-lg bg-[#2E1B18] border border-[#55241F] px-4 py-2.5 text-[#EDE0D3] placeholder:text-[#EDE0D3]/30 outline-none focus:border-[#DD4F44] transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-[#DD4F44]">{decodeURIComponent(error)}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-[#DD4F44] text-[#121212] font-medium py-2.5 mt-2 hover:bg-[#DD4F44]/90 active:scale-[0.99] transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
