-- DROP y crear base
DROP DATABASE IF EXISTS hotelesBA;
CREATE DATABASE hotelesBA;
USE hotelesBA;

-- Tabla sectores
CREATE TABLE barrio (
    barrio_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Insertar 10 sectores
INSERT INTO barrio (nombre) VALUES
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

-- Tabla hoteles con relación a barrio
CREATE TABLE hoteles (
    id_hotel INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    estrellas INT NOT NULL,
    descripcion TEXT,
    imagen VARCHAR(1500), -- <- Esto guarda la URL
    direccion VARCHAR(255),
    barrio_id INT,
    categoria VARCHAR(50),
    FOREIGN KEY (barrio_id) REFERENCES barrio(barrio_id)
);

-- Insertar hoteles ejemplo (30, para ejemplo; completa con la misma estructura hasta 100)
INSERT INTO hoteles (nombre, estrellas, descripcion, imagen, direccion, barrio, categoria) VALUES
('Hotel Palo Santo', 4, 'Boutique con estilo moderno y piscina.', 'https://media-cdn.tripadvisor.com/media/photo-s/12/5d/b2/68/the-beautiful-palo-santo.jpg', 'Costa Rica 5852, Palermo', 1, 'Boutique'),
('Vitrum Hotel', 4, 'Diseño contemporáneo y ubicación estratégica.', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/06/e8/71/hotel-vitrum.jpg?w=900&h=500&s=1', 'Gorriti 5780, Palermo', 1, 'Boutique'),
('Home Hotel', 4, 'Conocido por su arquitectura y ambiente relajado.', 'https://ultimallamada.com/wp-content/uploads/2021/12/Home-Hotel-Buenos-Aires-45.jpg', 'Armenia 1666, Palermo', 1, 'Boutique'),

('Alvear Palace Hotel', 5, 'Lujo clásico con spa y restaurantes gourmet.', 'https://media-cdn.tripadvisor.com/media/photo-s/08/6d/95/a4/alvear-palace-hotel.jpg', 'Av. Alvear 1891, Recoleta', 2, 'Lujo'),
('Loi Suites Recoleta', 5, 'Elegante y cerca de museos y parques.', 'https://q-xx.bstatic.com/xdata/images/hotel/max500/521121501.jpg?k=7292aac21e40a4b0443034828712d47bdfada3780b0a76d5d5df3af48f3532ff&o=', 'Posadas 1236, Recoleta', 2, 'Boutique'),
('Recoleta Grand', 4, 'Moderno con instalaciones de primera.', 'https://architector.calidadempresaria.net/wp-content/uploads/2021/05/foto-portada-recoleta.jpg', 'Junin 1824, Recoleta', 2, 'Boutique'),

('Hotel Plaza', 4, 'Tradicional, cerca de la Calle Florida.', 'https://www.clarin.com/2022/08/04/VYnqHM9hL_2000x1500__1.jpg', 'Florida 100, Microcentro', 3, 'Clásico'),
('NH Buenos Aires 9 de Julio', 4, 'Ubicación céntrica con vistas al Obelisco.', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/9c/73/49/caption.jpg?w=1200&h=1200&s=1', 'Av. 9 de Julio 1020, Microcentro', 3, 'Negocios'),
('Sofitel Buenos Aires', 5, 'Elegancia francesa en pleno centro.', 'https://m.ahstatic.com/is/image/accorhotels/aja_p_4743-51:8by10?fmt=jpg&op_usm=1.75,0.3,2,0&resMode=sharp2&iccEmbed=true&icc=sRGB&dpr=on,1.5&wid=335&hei=418&qlt=80', 'Carlos Pellegrini 850, Microcentro', 3, 'Lujo'),

('Faena Hotel', 5, 'Diseño único y vistas al río.', 'https://c8.alamy.com/comp/EMDKB8/faena-universe-hotel-puerto-madero-buenos-aires-argentina-EMDKB8.jpg', 'Martha Salotti 445, Puerto Madero', 4, 'Lujo'),
('Madero Hotel', 4, 'Moderno con spa y restaurantes.', 'https://ik.imgkit.net/3vlqs5axxjf/external/ik-seo/https://media.iceportal.com/141147/photos/71267044_XL/Hotel-Madero-Exterior.jpg?tr=w-656%2Ch-390%2Cfo-auto', 'Juana Manso 500, Puerto Madero', 4, 'Boutique'),
('Hotel Hilton Buenos Aires', 5, 'Lujo y comodidad en la zona más exclusiva.', 'https://ieinfoempresas.wordpress.com/wp-content/uploads/2017/02/hiltonbuenosaires.jpg', 'Macacha Güemes 351, Puerto Madero', 4, 'Lujo'),

('Hotel Boca Juniors by Design', 3, 'Temática futbolística y ambiente único.', 'https://i.blogs.es/2fd8bf/hotel-boca-np/450_1000.jpg', 'Av. Caseros 500, San Telmo', 5, 'Temático'),
('Hotel Babel', 3, 'Encanto bohemio y ubicación estratégica.', 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/hotelier-images/c2/05/908b591c5f6cf5c6d6e5a808ca592af4091572e3f012292b1b77436e8b87.jpeg', 'Chile 755, San Telmo', 5, 'Boutique'),
('Hotel Telmho', 4, 'Diseño vintage y cercanía a la Plaza Dorrego.', 'https://media-cdn.tripadvisor.com/media/photo-s/07/17/2a/4a/telmho-hotel-boutique.jpg', 'Defensa 600, San Telmo', 5, 'Boutique'),

('Palacio San Miguel', 4, 'Estilo clásico y elegante.', 'https://lh3.googleusercontent.com/proxy/zwp8HZCpyeGQVcsWU4eDaXKg0T0I615_BXiZcVE7wN18G-b0K1gnzEuG9jPddkH5IM3HMzySuYrQrmtatU3bYdVSRVdx8Q46EqOF', 'Virrey Loreto 234, Belgrano', 6, 'Clásico'),
('Hotel Cristoforo Colombo', 3, 'Cómodo y bien ubicado.', 'https://cdn.quehoteles.com/hotel-Hotel-Worldhotel-Cristoforo-Colombo-F50592_56ecd3b0950.jpeg', 'Virrey Loreto 654, Belgrano', 6, 'Turismo'),
('Hotel Belgrano', 3, 'Tradicional y cercano a la estación de tren.', 'https://y.cdrst.com/foto/hotel-sf/c98f00f/hotelgallery/foto-hotel-c98e565.jpg', 'Av. Cabildo 800, Belgrano', 6, 'Clásico'),

('Hotel Bisonte', 3, 'Confort y buena relación calidad-precio.', 'https://www.lasrosas.com.ar/portal/wp-content/uploads/WhatsApp-Image-2023-12-06-at-09.35.43.jpeg', 'Av. Rivadavia 5200, Caballito', 7, 'Turismo'),
('Hotel Continental', 3, 'Ubicación céntrica y servicios completos.', 'https://continentalsalta.com/_assets/media/a922c3774abb949d970ae0601affd6a5.jpg', 'Av. Rivadavia 5300, Caballito', 7, 'Clásico'),
('Hotel La Perla', 3, 'Tradicional y accesible.', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/La_Perla_del_Once_(4).JPG/800px-La_Perla_del_Once_(4).JPG', 'Av. Gaona 3200, Caballito', 7, 'Económico'),

('Hotel Cid', 3, 'Ambiente familiar y tranquilo.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZeJqEJt8OXDunIVY42xKU_quxhCO4yXXJXw&s', 'Av. Corrientes 4100, Almagro', 8, 'Económico'),
('Hotel El Conquistador', 3, 'Estilo clásico y buena ubicación.', 'https://www.es.momondo.com/himg/43/46/40/ice-51642-photo.aspx_did=2692_brochureid=51642_publicid=6125123_instanceid=2-image.jpg', 'Av. Corrientes 4200, Almagro', 8, 'Clásico'),
('Hotel Suipacha', 2, 'Económico y cercano a la Avenida Corrientes.', 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/partner-images/e8/29/2ac6443fcc65a4e59373ad2463ad6ecea43b19d01f54953c73a7995cb6ba.jpeg', 'Suipacha 200, Almagro', 8, 'Económico'),

('Devoto hotel', 3, 'Hotel familiar con atención personalizada, ubicado cerca de la Plaza Arenales.', 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/hotelier-images/d5/42/ad9a31a9d868ba21a7c831a4bac40865e57f9f3da19077975e05005a017d.jpeg', 'Lope de Vega 300, Villa Devoto', 9, 'Económico'),
('Days Inn Devoto', 3, 'Hotel moderno con 21 apartamentos, ideal para viajeros de negocios y turistas.', 'https://images.trvl-media.com/lodging/72000000/71410000/71402700/71402611/w2994h4006x0y0-dea95a06.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill', 'San Martín 6101, Villa Devoto', 9, 'Económico'),
('Hotel Boutique Devoto', 3, 'Suites de lujo con diseño exclusivo, ubicadas cerca de Plaza Arenales, ideales para estancias cortas y largas.', 'https://images.trvl-media.com/lodging/22000000/21980000/21973600/21973572/cae4011f.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill', 'Avenida Francisco Beiró 4591, Villa Devoto', 9, 'Confort'),

('Hotel Villa del Parque', 3, 'Tradicional y accesible.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROiU8XR9_SWUkwqg1qubdp1ODp2rglvIfEZK3iYzPZNfvxQGS1Pa-XwIHM471lWVxy0UU&usqp=CAU', 'Av. Nazca 3200, Villa del Parque', 10, 'Económico'),
('Hotel Los Andes', 3, 'Ambiente familiar y tranquilo.', 'https://pix10.agoda.net/hotelImages/367821/0/12d7735fe4af1af283a38d6f498ed680.jpeg?s=414x232', 'Av. San Martín 4000, Villa del Parque', 10, 'Económico'),
('hotel del parque', 3, 'Cómodo y bien ubicado.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_90WJm-P3B-jXDuw633AvMsKEOUzpCsyseg&s', 'Av. Segurola 1800, Villa del Parque', 10, 'Económico');

create table TipoHabitacion
(
	idTipoHabitacion int auto_increment primary key,
    nombre varchar(200),
    descripcion varchar(400),
    cantidadPersonas int,
    metrosCuadrados int,
    precio double,
    id_hotel int,
    FOREIGN KEY (id_hotel) REFERENCES hoteles(id_hotel)
);

create table Habitacion
(
	idHabitacion int primary key,
    numero int,
    idTipoHabitacion int,
    FOREIGN KEY (idTipoHabitacion) REFERENCES TipoHabitacion(idTipoHabitacion)
);

create table EstadoReserva(
	idEstadoReserva int primary key,
    nombre varchar(100),
    descripcion varchar(400)
);

create table usuario(
	idUsuario int primary key,
    nombre varchar(400),
    email varchar(400),
    pass varchar(900),
    telefono int,
    documento int
);

create table Reserva(
	idReserva int primary key,
    fechaInicio datetime,
    fechaLimite datetime,
    idEstadoReserva int,
    idUsuario int,
    idHabitacion int,
    FOREIGN KEY (idEstadoReserva) REFERENCES EstadoReserva(idEstadoReserva),
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (idHabitacion) REFERENCES Habitacion(idHabitacion)
);

create table Historial(
	idHistorial int primary key,
    idUsuario int,
    fechaGuardado datetime,
    id_hotel int,
    FOREIGN KEY (id_hotel) REFERENCES hoteles(id_hotel),
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);

create table Calificacion(
	idCalficacion int primary key,
    id_hotel int,
    idUsuario int,
    comentario varchar(400),
    estrellas int,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (id_hotel) REFERENCES hoteles(id_hotel)
    );
    
create table Servicio(
	idServicio int primary key,
    id_hotel int,
    wifi bool,
    pileta bool,
    restaurante bool,
    mascota bool,
    CancelacionSinCargo bool,
    desayuno bool,
    Terraza bool,
    FOREIGN KEY (id_hotel) REFERENCES hoteles(id_hotel)
);