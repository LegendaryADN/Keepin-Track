# Keepin' Track

App personal de control de gastos — Next.js (App Router) + Supabase + Tailwind, pensada como PWA instalable en Android.

## 1. Instalar dependencias

```bash
npm install
```

## 2. Variables de entorno

```bash
cp .env.local.example .env.local
```

Rellena `.env.local` con tu `Project URL` y `anon public key` (Supabase → Project Settings → API).

## 3. Base de datos

Si ya corriste el SQL en Supabase, no necesitas hacer nada más. `db/schema.sql` queda en el repo solo como referencia del schema (tabla `gastos`, políticas RLS, vistas de resumen).

## 4. Correr en local

```bash
npm run dev
```

Abre `http://localhost:3000` — te mandará a `/login`. Entra con tu correo o el de Fernanda (los usuarios que ya creaste en Supabase Authentication → Users).

## 5. Subir a GitHub

Si el repo ya existe y está vacío:

```bash
git init
git add .
git commit -m "Keepin' Track: MVP completo (login, captura, historial, PWA)"
git branch -M main
git remote add origin <URL-DE-TU-REPO>
git push -u origin main
```

Si el repo ya tiene contenido (por ejemplo, lo creaste desde el dashboard de Supabase/GitHub), en su lugar:

```bash
git remote add origin <URL-DE-TU-REPO>
git pull origin main --allow-unrelated-histories
git add .
git commit -m "Keepin' Track: MVP completo"
git push -u origin main
```

## 6. Desplegar en Vercel

1. Ve a vercel.com → **Add New Project** → importa tu repositorio de GitHub.
2. Vercel detecta Next.js automáticamente, no necesitas cambiar el build command.
3. En **Environment Variables**, agrega las mismas dos de tu `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Clic en **Deploy**. En 1-2 minutos tendrás una URL tipo `keepin-track.vercel.app`.
5. Desde tu Android, abre esa URL en Chrome → menú (⋮) → **Agregar a pantalla de inicio**. Con el `manifest.json` y los íconos ya incluidos, se instala como app con ícono propio y sin barra del navegador.

## Estructura del proyecto

```
app/
  layout.tsx          # layout raíz, metadata y PWA manifest
  globals.css          # Tailwind
  page.tsx              # pantalla "Hoy": total del día, formulario, lista
  actions.ts             # server actions: addExpense, signOut
  components/
    ExpenseForm.tsx       # formulario + animación "-$$"
    ExpenseList.tsx        # lista de gastos del día
    LogoutButton.tsx
  login/
    page.tsx               # pantalla de login
    actions.ts               # server action: signIn
  historial/
    page.tsx                  # trae todos los gastos del usuario
    HistorialClient.tsx        # agrupa por semana/mes, tabs, detalle expandible
lib/
  supabase/
    client.ts                   # cliente para Client Components
    server.ts                    # cliente para Server Components/Actions
middleware.ts                     # protege rutas, redirige a /login sin sesión
public/
  manifest.json                    # PWA
  icons/                             # íconos generados con tu paleta
db/
  schema.sql                         # referencia del schema SQL en Supabase
```

## Pendientes / ideas para después

- Presupuesto mensual con alerta visual si te pasas.
- Atajos de "gasto común" (ej. botón "Café $50").
- Vista combinada de gastos de pareja (tú + Fernanda).
- Editar/borrar un gasto ya registrado (por ahora solo se puede agregar).
