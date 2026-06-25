-- Tabla de personas reportadas
create table if not exists persons (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  age integer,
  gender text check (gender in ('M', 'F', 'other')),
  last_location text not null,
  description text,
  cedula text,
  photo_url text,
  status text default 'missing' check (status in ('missing', 'found')),
  contact_name text,
  contact_whatsapp text not null,
  contact_relation text,
  contact_info text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Índices para búsqueda rápida
create index if not exists persons_search_idx on persons using gin(to_tsvector('spanish', name || ' ' || last_location));
create index if not exists persons_status_idx on persons (status);
create index if not exists persons_created_at_idx on persons (created_at desc);

-- Storage bucket para fotos (ejecutar en Supabase Dashboard o via API)
-- insert into storage.buckets (id, name, public) values ('person-photos', 'person-photos', true);

-- Políticas RLS recomendadas (ajustar según necesidad)
alter table persons enable row level security;

create policy "Lectura pública de personas"
  on persons for select
  using (true);

create policy "Inserción pública de reportes"
  on persons for insert
  with check (true);
