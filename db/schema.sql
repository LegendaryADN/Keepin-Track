-- Ejecutar en el SQL Editor de Supabase (ya deberías haberlo corrido,
-- este archivo queda como referencia dentro del repo)

create table if not exists gastos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) default auth.uid(),
  total numeric(10,2) not null,
  concepto text not null,
  fecha date not null default current_date,
  created_at timestamptz not null default now()
);

create index if not exists idx_gastos_user_fecha on gastos(user_id, fecha);

alter table gastos enable row level security;

create policy "select_own_gastos" on gastos
  for select using (auth.uid() = user_id);

create policy "insert_own_gastos" on gastos
  for insert with check (auth.uid() = user_id);

create policy "update_own_gastos" on gastos
  for update using (auth.uid() = user_id);

create policy "delete_own_gastos" on gastos
  for delete using (auth.uid() = user_id);

create view resumen_diario
with (security_invoker = true) as
select user_id, fecha, sum(total) as total_dia
from gastos
group by user_id, fecha;

create view resumen_semanal
with (security_invoker = true) as
select user_id, date_trunc('week', fecha) as semana, sum(total) as total_semana
from gastos
group by user_id, semana;

create view resumen_mensual
with (security_invoker = true) as
select user_id, date_trunc('month', fecha) as mes, sum(total) as total_mes
from gastos
group by user_id, mes;
