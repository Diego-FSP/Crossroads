
CREATE DATABASE hoteles_caba;
USE hoteles_caba;

CREATE TABLE hoteles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  sector VARCHAR(50) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  estrellas INT NOT NULL,
  descripcion TEXT,
  imagen LONGBLOB
);

INSERT INTO hoteles (nombre, sector, precio, estrellas, descripcion)
VALUES
('Hotel Palermo Relax', 'Palermo', 55000, 4, 'Hotel moderno con terraza y bar.'),
('Recoleta Suites', 'Recoleta', 62000, 5, 'Lujo con estilo clásico en el corazón de CABA.'),
('Belgrano Garden', 'Belgrano', 45000, 3, 'Ideal para estadías familiares.'),
('San Telmo Nights', 'San Telmo', 38000, 4, 'Ambiente artístico y nocturno.'),
('Puerto Madero View', 'Puerto Madero', 90000, 5, 'Vista al río y piscina infinita.');
