Drop database if exists hotelesBA;
-- Crear base de datos
CREATE DATABASE hotelesBA;

-- Usar la base de datos
USE hotelesBA;

-- Crear tabla de hoteles
CREATE TABLE hoteles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    estrellas INT NOT NULL,
    descripcion TEXT,
    imagen VARCHAR(255)
);

-- Insertar algunos hoteles de ejemplo
INSERT INTO hoteles (nombre, estrellas, descripcion, imagen) VALUES
('Hotel Alvear', 5, 'Un hotel lujoso en el corazón de Buenos Aires.', 'hotel1.jpg'),
('NH Buenos Aires', 4, 'Hotel moderno con excelente ubicación cerca de teatros y restaurantes.', 'hotel2.jpg'),
('Howard Johnson', 3, 'Confortable y accesible, ideal para turistas.', 'hotel3.jpg'),
('Sheraton Buenos Aires', 5, 'Hotel elegante con vistas al río y servicios premium.', 'hotel4.jpg'),
('Palacio Duhau', 5, 'Experiencia de lujo con spa y restaurantes gourmet.', 'hotel5.jpg'),
('Meliá Recoleta', 4, 'Ubicado en el barrio de Recoleta, moderno y confortable.', 'hotel6.jpg'),
('Regal Pacific', 4, 'Hotel cómodo, ideal para viajes de negocios.', 'hotel7.jpg'),
('Esplendor Palermo', 4, 'Moderno hotel en Palermo con piscina y gimnasio.', 'hotel8.jpg'),
('Hotel Emperador', 4, 'Ubicación central con excelentes servicios.', 'hotel9.jpg'),
('Loi Suites Recoleta', 5, 'Hotel boutique con diseño elegante y piscina en la azotea.', 'hotel10.jpg'),
('Art Suites', 3, 'Hotel con estilo artístico y precios accesibles.', 'hotel11.jpg'),
('Dazzler Buenos Aires', 4, 'Hotel moderno con buena ubicación y desayuno incluido.', 'hotel12.jpg'),
('CasaCalma Hotel', 3, 'Pequeño hotel boutique con atención personalizada.', 'hotel13.jpg'),
('Faena Hotel', 5, 'Hotel icónico de lujo en Puerto Madero.', 'hotel14.jpg'),
('Hotel Pulitzer', 4, 'Confortable, cerca de los principales puntos turísticos.', 'hotel15.jpg'),
('Hotel Panamericano', 5, 'Vistas increíbles y servicios de primera.', 'hotel16.jpg'),
('Ibis Buenos Aires', 3, 'Económico, moderno y funcional para turistas.', 'hotel17.jpg'),
('Hotel NH City', 4, 'Moderno y céntrico, ideal para negocios y turismo.', 'hotel18.jpg'),
('Palacio San Miguel', 4, 'Hotel histórico con encanto y confort.', 'hotel19.jpg'),
('Tango de Mayo', 3, 'Hotel con estilo tradicional y buena ubicación.', 'hotel20.jpg'),
('Hotel Claridge', 4, 'Elegante hotel clásico en Buenos Aires.', 'hotel21.jpg'),
('Recoleta Grand', 5, 'Hotel de lujo con spa y restaurante gourmet.', 'hotel22.jpg'),
('Mio Buenos Aires', 4, 'Moderno hotel boutique con piscina y gimnasio.', 'hotel23.jpg'),
('Boutique Palermo', 3, 'Pequeño hotel acogedor en el barrio de Palermo.', 'hotel24.jpg'),
('Hotel Jazz', 3, 'Hotel moderno y económico cerca del centro.', 'hotel25.jpg');
