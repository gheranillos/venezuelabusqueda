-- Migración: agregar coordenadas para el mapa (ejecutar si ya tienes la tabla creada)
alter table persons add column if not exists latitude double precision;
alter table persons add column if not exists longitude double precision;
