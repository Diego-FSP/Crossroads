-- DROP y crear base
DROP DATABASE IF EXISTS hotelesBA;
CREATE DATABASE hotelesBA;
USE hotelesBA;

-- Tabla sectores
CREATE TABLE sectores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Insertar 10 sectores
INSERT INTO sectores (nombre) VALUES
('Palermo'),
('Recoleta'),
('Microcentro'),
('Puerto Madero'),
('San Telmo'),
('Belgrano'),
('Caballito'),
('Almagro'),
('Villa Devoto'),
('Villa del Parque');

-- Tabla hoteles con relación a sectores
CREATE TABLE hoteles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    estrellas INT NOT NULL,
    descripcion TEXT,
    imagen VARCHAR(255),
    direccion VARCHAR(255),
    sector_id INT,
    categoria VARCHAR(50),
    precio FLOAT,
    FOREIGN KEY (sector_id) REFERENCES sectores(id)
);

-- Insertar hoteles ejemplo (30, para ejemplo; completa con la misma estructura hasta 100)
INSERT INTO hoteles (nombre, estrellas, descripcion, imagen, direccion, sector_id, categoria, precio) VALUES
('Hotel Palo Santo', 4, 'Boutique con estilo moderno y piscina.', 'https://media-cdn.tripadvisor.com/media/photo-s/12/5d/b2/68/the-beautiful-palo-santo.jpg', 'Costa Rica 5852, Palermo', 1, 'Boutique', 120),
('Vitrum Hotel', 4, 'Diseño contemporáneo y ubicación estratégica.', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/06/e8/71/hotel-vitrum.jpg?w=900&h=500&s=1', 'Gorriti 5780, Palermo', 1, 'Boutique', 130),
('Home Hotel', 4, 'Conocido por su arquitectura y ambiente relajado.', 'https://ultimallamada.com/wp-content/uploads/2021/12/Home-Hotel-Buenos-Aires-45.jpg', 'Armenia 1666, Palermo', 1, 'Boutique', 125),

('Alvear Palace Hotel', 5, 'Lujo clásico con spa y restaurantes gourmet.', 'hotel_alvear.jpg', 'Av. Alvear 1891, Recoleta', 2, 'Lujo', 350),
('Loi Suites Recoleta', 5, 'Elegante y cerca de museos y parques.', 'hotel_loi_suites.jpg', 'Posadas 1236, Recoleta', 2, 'Boutique', 280),
('Recoleta Grand', 4, 'Moderno con instalaciones de primera.', 'hotel_recoleta_grand.jpg', 'Junin 1824, Recoleta', 2, 'Boutique', 200),

('Hotel Plaza', 4, 'Tradicional, cerca de la Calle Florida.', 'hotel_plaza.jpg', 'Florida 100, Microcentro', 3, 'Clásico', 150),
('NH Buenos Aires 9 de Julio', 4, 'Ubicación céntrica con vistas al Obelisco.', 'hotel_nh_9dejulio.jpg', 'Av. 9 de Julio 1020, Microcentro', 3, 'Negocios', 160),
('Sofitel Buenos Aires', 5, 'Elegancia francesa en pleno centro.', 'hotel_sofitel.jpg', 'Carlos Pellegrini 850, Microcentro', 3, 'Lujo', 380),

('Faena Hotel', 5, 'Diseño único y vistas al río.', 'hotel_faena.jpg', 'Martha Salotti 445, Puerto Madero', 4, 'Lujo', 400),
('Madero Hotel', 4, 'Moderno con spa y restaurantes.', 'hotel_madero.jpg', 'Juana Manso 500, Puerto Madero', 4, 'Boutique', 220),
('Hotel Hilton Buenos Aires', 5, 'Lujo y comodidad en la zona más exclusiva.', 'hotel_hilton.jpg', 'Macacha Güemes 351, Puerto Madero', 4, 'Lujo', 380),

('Hotel Boca Juniors by Design', 3, 'Temática futbolística y ambiente único.', 'hotel_boca.jpg', 'Av. Caseros 500, San Telmo', 5, 'Temático', 90),
('Hotel Babel', 3, 'Encanto bohemio y ubicación estratégica.', 'hotel_babel.jpg', 'Chile 755, San Telmo', 5, 'Boutique', 110),
('Hotel Telmho', 4, 'Diseño vintage y cercanía a la Plaza Dorrego.', 'hotel_telmho.jpg', 'Defensa 600, San Telmo', 5, 'Boutique', 115),

('Palacio San Miguel', 4, 'Estilo clásico y elegante.', 'hotel_palacio_sanmiguel.jpg', 'Virrey Loreto 234, Belgrano', 6, 'Clásico', 180),
('Hotel Cristoforo Colombo', 3, 'Cómodo y bien ubicado.', 'hotel_cristoforo.jpg', 'Virrey Loreto 654, Belgrano', 6, 'Turismo', 100),
('Hotel Belgrano', 3, 'Tradicional y cercano a la estación de tren.', 'hotel_belgrano.jpg', 'Av. Cabildo 800, Belgrano', 6, 'Clásico', 110),

('Hotel Bisonte', 3, 'Confort y buena relación calidad-precio.', 'hotel_bisonte.jpg', 'Av. Rivadavia 5200, Caballito', 7, 'Turismo', 90),
('Hotel Continental', 3, 'Ubicación céntrica y servicios completos.', 'hotel_continental.jpg', 'Av. Rivadavia 5300, Caballito', 7, 'Clásico', 95),
('Hotel La Perla', 3, 'Tradicional y accesible.', 'hotel_laperla.jpg', 'Av. Gaona 3200, Caballito', 7, 'Económico', 80),

('Hotel Cid', 3, 'Ambiente familiar y tranquilo.', 'hotel_cid.jpg', 'Av. Corrientes 4100, Almagro', 8, 'Económico', 75),
('Hotel El Conquistador', 3, 'Estilo clásico y buena ubicación.', 'hotel_conquistador.jpg', 'Av. Corrientes 4200, Almagro', 8, 'Clásico', 80),
('Hotel Suipacha', 2, 'Económico y cercano a la Avenida Corrientes.', 'hotel_suipacha.jpg', 'Suipacha 200, Almagro', 8, 'Económico', 70),

('Hotel Devoto', 3, 'Ambiente tranquilo y familiar.', 'hotel_devoto.jpg', 'Gral. José Gervasio Artigas 1230, Villa Devoto', 9, 'Económico', 65),
('Hotel Los Angeles', 3, 'Económico y bien ubicado.', 'hotel_losangeles.jpg', 'Av. Mosconi 900, Villa Devoto', 9, 'Económico', 60),
('Hotel Del Parque', 3, 'Cómodo y con servicios básicos.', 'hotel_delparque.jpg', 'Av. Sanabria 1500, Villa Devoto', 9, 'Económico', 60),

('Hotel Villa del Parque', 3, 'Tradicional y accesible.', 'hotel_villadelparque.jpg', 'Av. Nazca 3200, Villa del Parque', 10, 'Económico', 60),
('Hotel Los Andes', 3, 'Ambiente familiar y tranquilo.', 'hotel_losandes.jpg', 'Av. San Martín 4000, Villa del Parque', 10, 'Económico', 55),
('Hotel El Parque', 3, 'Cómodo y bien ubicado.', 'hotel_elparque.jpg', 'Av. Segurola 1800, Villa del Parque', 10, 'Económico', 58);
