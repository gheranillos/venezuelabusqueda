-- Seed de personas desde screenshots (fotos en /public/personas/)
-- Reemplaza TU_DOMINIO con tu URL de Vercel, ej: https://desaparecidos-venezuela.vercel.app

-- Ejecutar solo una vez. Si ya insertaste, borra duplicados primero.

INSERT INTO persons (name, age, gender, last_location, latitude, longitude, description, cedula, photo_url, status, contact_whatsapp, contact_relation) VALUES
('Dayany y Dayerlin Sánchez', 40, 'F', 'Venezuela (ubicación exacta desconocida)', 10.6, -66.93, 'No se sabe de ellas después del terremoto del 24 de junio. C.I. 16129448 / 1612450.', '16129448', 'TU_DOMINIO/personas/dayany-dayerlin-sanchez.jpg', 'missing', '00000000000', 'Familiar'),
('Alejandro Wladimir Landaeta Mejías', NULL, 'M', 'Edificio Bello Horizonte, Catia La Mar', 10.6, -66.95, 'Desaparecido tras el terremoto del 24 de junio.', NULL, 'TU_DOMINIO/personas/alejandro-landaeta.jpg', 'missing', '04243696841', 'Familiar'),
('Paola Briceño', NULL, 'F', 'Catia La Mar, Edificio Malecón, cerca del Club de Yates de La Guaira', 10.6, -66.95, NULL, NULL, 'TU_DOMINIO/personas/paola-briceno.jpg', 'missing', '04141464092', 'Familiar'),
('Clementina Segovia', NULL, 'F', 'Edificio Costa Brava, Los Corales, La Guaira', 10.59, -66.92, 'Desaparecida tras terremoto, 24 de junio.', 'V-28155685', 'TU_DOMINIO/personas/clementina-segovia.jpg', 'missing', '04243420415', 'Familiar'),
('Ian Lambert', NULL, 'M', 'La Guaira, Los Corales', 10.59, -66.92, NULL, 'V-30225544', 'TU_DOMINIO/personas/ian-lambert.jpg', 'missing', '04127240400', 'Amigos'),
('Aaron Isaac Villalta', 8, 'M', 'Pariata, La Guaira — Emergencia pediátrica Hospital Pérez Carreño', 10.58, -66.94, 'Traído por Ven 911. SIN FAMILIAR. Se busca a su familia.', NULL, 'TU_DOMINIO/personas/aaron-villalta.jpg', 'missing', '00000000000', 'Hospital'),
('Alonso Cabrera', 6, 'M', 'Edificio Bahía Mar, Av. Principal La Costanera', 10.6, -66.93, 'Sobrino desaparecido tras el terremoto.', NULL, 'TU_DOMINIO/personas/alonso-cabrera.jpg', 'missing', '00000000000', 'Tía'),
('Antonio Cabrera', NULL, 'M', 'Edificio Bahía Mar, Av. Principal La Costanera', 10.601, -66.931, 'Piloto. C.I. 2904181.', '2904181', 'TU_DOMINIO/personas/antonio-cabrera-piloto.jpg', 'missing', '00000000000', 'Tía'),
('Francisco Antonio Marcano Paruta', 66, 'M', 'Carayaca, estado La Guaira', 10.62, -66.92, 'Desaparecido desde el terremoto del 24 de junio.', NULL, 'TU_DOMINIO/personas/francisco-marcano.jpg', 'missing', '04248726631', 'Familiares'),
('Yimvert Berroterán', 18, 'M', 'Los Corales, La Guaira', 10.59, -66.92, 'Altura 1.80 m, contextura atlética. Jugador de fútbol.', NULL, 'TU_DOMINIO/personas/yimvert-berroteran.jpg', 'missing', '04141133786', 'FVF / Familia'),
('Ana Solangel Prieto', 67, 'F', 'Aeropuerto de Maiquetía, salida de emergencia (7:30 pm)', 10.6, -66.98, 'Número extranjero. Sola en Caracas.', NULL, 'TU_DOMINIO/personas/ana-solangel-prieto.jpg', 'missing', '04249050375', 'Familiar'),
('Génesis Aguirre y Maximiliano Merentes', NULL, 'F', 'La Guaira, Tanaguarenas', 10.58, -66.9, 'Madre e hijo. Sin información desde el terremoto.', NULL, 'TU_DOMINIO/personas/genesis-aguirre-maximiliano.jpg', 'missing', '04248875689', 'Familiar'),
('Skarlent Rodríguez', NULL, 'F', 'Catia La Mar, Av. La Atlántida, Calle 7, Quinta Anache', 10.6, -66.95, NULL, NULL, 'TU_DOMINIO/personas/skarlent-rodriguez.jpg', 'missing', '04244567728', 'Familiar'),
('Natalia Benezra', 22, 'F', 'La Guaira, zona Playa Pantaleta', 10.6, -66.93, 'Estaba en La Guaira cuando ocurrió el terremoto.', NULL, 'TU_DOMINIO/personas/natalia-benezra.jpg', 'missing', '00000000000', 'Familiar');
