-- Ejecutar en Supabase → SQL Editor después de crear el bucket "person-photos"

-- Políticas de Storage (lectura pública + subida para reportes)
create policy "Fotos públicas"
  on storage.objects for select
  using (bucket_id = 'person-photos');

create policy "Subir fotos de reportes"
  on storage.objects for insert
  with check (bucket_id = 'person-photos');
