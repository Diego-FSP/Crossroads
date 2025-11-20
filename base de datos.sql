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
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    estrellas INT NOT NULL,
    descripcion TEXT,
    imagen VARCHAR(1500), -- <- Esto guarda la URL
    direccion VARCHAR(255),
    barrio_id INT,
    categoria VARCHAR(50),
    precio double,
    mapa varchar(1000),
    FOREIGN KEY (barrio_id) REFERENCES barrio(barrio_id)
);

-- Insertar hoteles ejemplo (30, para ejemplo; completa con la misma estructura hasta 100)
INSERT INTO hoteles (precio, nombre, estrellas, descripcion, mapa, imagen, direccion, barrio_id, categoria) VALUES
(1000,'Hotel Palo Santo', 4, 'Boutique con estilo moderno y piscina.'                                                                              ,'pb=!1m18!1m12!1m3!1d3284.9965005466606!2d-58.432110699999996!3d-34.5789551!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb5911aef258b%3A0x6dbe6b19813c454c!2sPalo%20Santo%20Hotel!5e0!3m2!1ses!2sar!4v1763648781683!5m2!1ses!2sar', 'https://media-cdn.tripadvisor.com/media/photo-s/12/5d/b2/68/the-beautiful-palo-santo.jpg', 'Costa Rica 5852, Palermo', 1, 'Boutique'),
(1000,'Vitrum Hotel', 4, 'Diseño contemporáneo y ubicación estratégica.'                                                                           ,'pb=!1m18!1m12!1m3!1d3284.7798629679623!2d-58.43754!3d-34.5844363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb58d76a60f69%3A0x2bd43ba20b9f747d!2sVitrum%20Hotel!5e0!3m2!1ses!2sar!4v1763649003096!5m2!1ses!2sar', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/06/e8/71/hotel-vitrum.jpg?w=900&h=500&s=1', 'Gorriti 5780, Palermo', 1, 'Boutique'),
(1000,'Home Hotel', 4, 'Conocido por su arquitectura y ambiente relajado.'                                                                         ,'pb=!1m18!1m12!1m3!1d3284.8672948458197!2d-58.44172022488589!3d-34.582224256362274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb592dcedfa99%3A0xc3d289ba2cd27d71!2sHome%20Hotel!5e0!3m2!1ses!2sar!4v1763649286456!5m2!1ses!2sar', 'https://ultimallamada.com/wp-content/uploads/2021/12/Home-Hotel-Buenos-Aires-45.jpg', 'Armenia 1666, Palermo', 1, 'Boutique'),

(1000,'Alvear Palace Hotel', 5, 'Lujo clásico con spa y restaurantes gourmet.'                                                                     ,'', 'https://media-cdn.tripadvisor.com/media/photo-s/08/6d/95/a4/alvear-palace-hotel.jpg', 'Av. Alvear 1891, Recoleta', 2, 'Lujo'),
(1000,'Loi Suites Recoleta', 5, 'Elegante y cerca de museos y parques.'                                                                            ,'', 'https://q-xx.bstatic.com/xdata/images/hotel/max500/521121501.jpg?k=7292aac21e40a4b0443034828712d47bdfada3780b0a76d5d5df3af48f3532ff&o=', 'Posadas 1236, Recoleta', 2, 'Boutique'),
(1000,'Recoleta Grand', 4, 'Moderno con instalaciones de primera.'                                                                                 ,'', 'https://architector.calidadempresaria.net/wp-content/uploads/2021/05/foto-portada-recoleta.jpg', 'Junin 1824, Recoleta', 2, 'Boutique'),

(1000,'Hotel Plaza', 4, 'Tradicional, cerca de la Calle Florida.'                                                                                  ,'', 'https://www.clarin.com/2022/08/04/VYnqHM9hL_2000x1500__1.jpg', 'Florida 100, Microcentro', 3, 'Clásico'),
(1000,'NH Buenos Aires 9 de Julio', 4, 'Ubicación céntrica con vistas al Obelisco.'                                                                ,'', 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/9c/73/49/caption.jpg?w=1200&h=1200&s=1', 'Av. 9 de Julio 1020, Microcentro', 3, 'Negocios'),
(1000,'Sofitel Buenos Aires', 5, 'Elegancia francesa en pleno centro.'                                                                             ,'', 'https://m.ahstatic.com/is/image/accorhotels/aja_p_4743-51:8by10?fmt=jpg&op_usm=1.75,0.3,2,0&resMode=sharp2&iccEmbed=true&icc=sRGB&dpr=on,1.5&wid=335&hei=418&qlt=80', 'Carlos Pellegrini 850, Microcentro', 3, 'Lujo'),

(1000,'Faena Hotel', 5, 'Diseño único y vistas al río.'                                                                                            ,'', 'https://c8.alamy.com/comp/EMDKB8/faena-universe-hotel-puerto-madero-buenos-aires-argentina-EMDKB8.jpg', 'Martha Salotti 445, Puerto Madero', 4, 'Lujo'),
(1000,'Madero Hotel', 4, 'Moderno con spa y restaurantes.'                                                                                         ,'', 'https://ik.imgkit.net/3vlqs5axxjf/external/ik-seo/https://media.iceportal.com/141147/photos/71267044_XL/Hotel-Madero-Exterior.jpg?tr=w-656%2Ch-390%2Cfo-auto', 'Juana Manso 500, Puerto Madero', 4, 'Boutique'),
(1000,'Hotel Hilton Buenos Aires', 5, 'Lujo y comodidad en la zona más exclusiva.'                                                                 ,'', 'https://ieinfoempresas.wordpress.com/wp-content/uploads/2017/02/hiltonbuenosaires.jpg', 'Macacha Güemes 351, Puerto Madero', 4, 'Lujo'),

(1000,'Hotel Boca Juniors by Design', 3, 'Temática futbolística y ambiente único.'                                                                 ,'', 'https://i.blogs.es/2fd8bf/hotel-boca-np/450_1000.jpg', 'Av. Caseros 500, San Telmo', 5, 'Temático'),
(1000,'Hotel Babel', 3, 'Encanto bohemio y ubicación estratégica.'                                                                                 ,'', 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/hotelier-images/c2/05/908b591c5f6cf5c6d6e5a808ca592af4091572e3f012292b1b77436e8b87.jpeg', 'Chile 755, San Telmo', 5, 'Boutique'),
(1000,'Hotel Telmho', 4, 'Diseño vintage y cercanía a la Plaza Dorrego.'                                                                           ,'', 'https://media-cdn.tripadvisor.com/media/photo-s/07/17/2a/4a/telmho-hotel-boutique.jpg', 'Defensa 600, San Telmo', 5, 'Boutique'),

(1000,'Palacio San Miguel', 4, 'Estilo clásico y elegante.'                                                                                        ,'', 'https://lh3.googleusercontent.com/proxy/zwp8HZCpyeGQVcsWU4eDaXKg0T0I615_BXiZcVE7wN18G-b0K1gnzEuG9jPddkH5IM3HMzySuYrQrmtatU3bYdVSRVdx8Q46EqOF', 'Virrey Loreto 234, Belgrano', 6, 'Clásico'),
(1000,'Hotel Cristoforo Colombo', 3, 'Cómodo y bien ubicado.'                                                                                      ,'', 'https://cdn.quehoteles.com/hotel-Hotel-Worldhotel-Cristoforo-Colombo-F50592_56ecd3b0950.jpeg', 'Virrey Loreto 654, Belgrano', 6, 'Turismo'),
(1000,'Hotel Belgrano', 3, 'Tradicional y cercano a la estación de tren.'                                                                          ,'', 'https://y.cdrst.com/foto/hotel-sf/c98f00f/hotelgallery/foto-hotel-c98e565.jpg', 'Av. Cabildo 800, Belgrano', 6, 'Clásico'),

(1000,'Hotel Bisonte', 3, 'Confort y buena relación calidad-precio.'                                                                               ,'', 'https://www.lasrosas.com.ar/portal/wp-content/uploads/WhatsApp-Image-2023-12-06-at-09.35.43.jpeg', 'Av. Rivadavia 5200, Caballito', 7, 'Turismo'),
(1000,'Hotel Continental', 3, 'Ubicación céntrica y servicios completos.'                                                                          ,'', 'https://continentalsalta.com/_assets/media/a922c3774abb949d970ae0601affd6a5.jpg', 'Av. Rivadavia 5300, Caballito', 7, 'Clásico'),
(1000,'Hotel La Perla', 3, 'Tradicional y accesible.'                                                                                              ,'', 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/La_Perla_del_Once_(4).JPG/800px-La_Perla_del_Once_(4).JPG', 'Av. Gaona 3200, Caballito', 7, 'Económico'),

(1000,'Hotel Cid', 3, 'Ambiente familiar y tranquilo.'                                                                                             ,'', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZeJqEJt8OXDunIVY42xKU_quxhCO4yXXJXw&s', 'Av. Corrientes 4100, Almagro', 8, 'Económico'),
(1000,'Hotel El Conquistador', 3, 'Estilo clásico y buena ubicación.'                                                                              ,'pb=!1m18!1m12!1m3!1d3284.2804884429565!2d-58.3799827!3d-34.5970682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacba27001cd%3A0xe0f9b7c16c7447ab!2sEl%20Conquistador%20Hotel!5e0!3m2!1ses!2sar!4v1763647483018!5m2!1ses!2sar', 'https://www.es.momondo.com/himg/43/46/40/ice-51642-photo.aspx_did=2692_brochureid=51642_publicid=6125123_instanceid=2-image.jpg', 'Av. Corrientes 4200, Almagro', 8, 'Clásico'),
(1000,'Hotel Suipacha', 2, 'Económico y cercano a la Avenida Corrientes.'                                                                          ,'', 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/partner-images/e8/29/2ac6443fcc65a4e59373ad2463ad6ecea43b19d01f54953c73a7995cb6ba.jpeg', 'Suipacha 200, Almagro', 8, 'Económico'),

(1000,'Devoto hotel', 3, 'Hotel familiar con atención personalizada, ubicado cerca de la Plaza Arenales.'                                          ,'', 'https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/hotelier-images/d5/42/ad9a31a9d868ba21a7c831a4bac40865e57f9f3da19077975e05005a017d.jpeg', 'Lope de Vega 300, Villa Devoto', 9, 'Económico'),
(1000,'Days Inn Devoto', 3, 'Hotel moderno con 21 apartamentos, ideal para viajeros de negocios y turistas.'                                       ,'', 'https://images.trvl-media.com/lodging/72000000/71410000/71402700/71402611/w2994h4006x0y0-dea95a06.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill', 'San Martín 6101, Villa Devoto', 9, 'Económico'),
(1000,'Hotel Boutique Devoto', 3, 'Suites de lujo con diseño exclusivo, ubicadas cerca de Plaza Arenales, ideales para estancias cortas y largas.' ,'', 'https://images.trvl-media.com/lodging/22000000/21980000/21973600/21973572/cae4011f.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill', 'Avenida Francisco Beiró 4591, Villa Devoto', 9, 'Confort'),

(1000,'Hotel Villa del Parque', 3, 'Tradicional y accesible.'                                                                                      ,'', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROiU8XR9_SWUkwqg1qubdp1ODp2rglvIfEZK3iYzPZNfvxQGS1Pa-XwIHM471lWVxy0UU&usqp=CAU', 'Av. Nazca 3200, Villa del Parque', 10, 'Económico'),
(1000,'Hotel Los Andes', 3, 'Ambiente familiar y tranquilo.'                                                                                       ,'', 'https://pix10.agoda.net/hotelImages/367821/0/12d7735fe4af1af283a38d6f498ed680.jpeg?s=414x232', 'Av. San Martín 4000, Villa del Parque', 10, 'Económico'),
(1000,'hotel del parque', 3, 'Cómodo y bien ubicado.'                                                                                              ,'', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_90WJm-P3B-jXDuw633AvMsKEOUzpCsyseg&s', 'Av. Segurola 1800, Villa del Parque', 10, 'Económico');

create table TipoHabitacion
(
	idTipoHabitacion int auto_increment primary key,
    nombre varchar(200),
    descripcion varchar(400),
    cantidadPersonas int,
    metrosCuadrados int,
    precio double,
    id_hotel int,
    FOREIGN KEY (id_hotel) REFERENCES hoteles(id)
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
    FOREIGN KEY (id_hotel) REFERENCES hoteles(id),
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario)
);

create table Calificacion(
	idCalficacion int primary key,
    id_hotel int,
    idUsuario int,
    comentario varchar(400),
    estrellas int,
    FOREIGN KEY (idUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (id_hotel) REFERENCES hoteles(id)
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
    FOREIGN KEY (id_hotel) REFERENCES hoteles(id)
);

-- PALERMO
INSERT INTO TipoHabitacion (nombre, descripcion, cantidadPersonas, metrosCuadrados, precio, id_hotel) VALUES
('Habitación Standard', 'Cómoda habitación con cama queen y vista al jardín.', 2, 25, 150, 1),
('Suite Deluxe', 'Amplia suite con balcón privado y baño con jacuzzi.', 2, 40, 250, 1),

('Habitación Doble', 'Decoración moderna, equipada con escritorio y minibar.', 2, 28, 180, 2),
('Suite Vitrum', 'Suite de diseño con área de estar y cocina pequeña.', 3, 45, 270, 2),

('Habitación Clásica', 'Diseño minimalista, ideal para estadías cortas.', 2, 24, 160, 3),
('Suite Jardín', 'Con terraza y vista a la piscina.', 3, 38, 240, 3);

-- RECOLETA
INSERT INTO TipoHabitacion (nombre, descripcion, cantidadPersonas, metrosCuadrados, precio, id_hotel) VALUES
('Habitación Deluxe', 'Decoración francesa y amenities de lujo.', 2, 35, 350, 4),
('Suite Presidencial', 'Salón privado y servicio personalizado.', 4, 60, 600, 4),

('Habitación Estándar', 'Cómoda habitación con vista a la ciudad.', 2, 30, 220, 5),
('Suite Recoleta', 'Baño con hidromasaje y balcón privado.', 3, 45, 310, 5),

('Habitación Ejecutiva', 'Espaciosa y con escritorio de trabajo.', 2, 28, 200, 6),
('Suite Grand', 'Suite moderna con living y jacuzzi.', 3, 42, 300, 6);

-- MICROCENTRO
INSERT INTO TipoHabitacion (nombre, descripcion, cantidadPersonas, metrosCuadrados, precio, id_hotel) VALUES
('Habitación Clásica', 'Diseño elegante, ideal para viajeros de negocios.', 2, 27, 180, 7),
('Suite Plaza', 'Con vistas a la Calle Florida y área de estar.', 3, 40, 260, 7),

('Habitación Ejecutiva', 'Con vista al Obelisco y escritorio amplio.', 2, 28, 210, 8),
('Suite 9 de Julio', 'Baño de mármol y sala de estar.', 3, 44, 290, 8),

('Habitación Lujo', 'Inspirada en el estilo francés, con cama king.', 2, 30, 320, 9),
('Suite Sofitel', 'Con chimenea y terraza privada.', 3, 50, 480, 9);

-- PUERTO MADERO
INSERT INTO TipoHabitacion (nombre, descripcion, cantidadPersonas, metrosCuadrados, precio, id_hotel) VALUES
('Habitación Premium', 'Con vistas al río y decoración moderna.', 2, 32, 330, 10),
('Suite Faena', 'Suite roja emblemática, con diseño de Philippe Starck.', 2, 55, 600, 10),

('Habitación Estándar', 'Con balcón y decoración minimalista.', 2, 28, 250, 11),
('Suite Madero', 'Vista al dique y jacuzzi privado.', 3, 45, 380, 11),

('Habitación Ejecutiva', 'Ideal para viajeros de negocios.', 2, 35, 300, 12),
('Suite Hilton', 'Suite con acceso al lounge y vistas panorámicas.', 4, 55, 550, 12);

-- SAN TELMO
INSERT INTO TipoHabitacion (nombre, descripcion, cantidadPersonas, metrosCuadrados, precio, id_hotel) VALUES
('Habitación Temática', 'Decorada con motivos futbolísticos.', 2, 26, 180, 13),
('Suite Boca', 'Ambiente temático con jacuzzi azul y dorado.', 2, 40, 250, 13),

('Habitación Standard', 'Decoración bohemia y vista al patio.', 2, 24, 150, 14),
('Suite Babel', 'Suite amplia con cocina equipada.', 3, 38, 230, 14),

('Habitación Vintage', 'Ambiente cálido con mobiliario antiguo.', 2, 28, 180, 15),
('Suite Dorrego', 'Vista a la Plaza Dorrego, ideal para parejas.', 2, 35, 250, 15);

-- BELGRANO
INSERT INTO TipoHabitacion (nombre, descripcion, cantidadPersonas, metrosCuadrados, precio, id_hotel) VALUES
('Habitación Clásica', 'Decoración tradicional y acogedora.', 2, 26, 160, 16),
('Suite Belgrano', 'Vista panorámica y sala de estar.', 3, 40, 250, 16),

('Habitación Estándar', 'Confortable y funcional.', 2, 25, 140, 17),
('Suite Colombo', 'Espaciosa con kitchenette y balcón.', 3, 38, 200, 17),

('Habitación Tradicional', 'Cercana al transporte y cómoda.', 2, 23, 130, 18),
('Suite Familiar', 'Dos camas matrimoniales y baño amplio.', 4, 42, 210, 18);

-- CABALLITO
INSERT INTO TipoHabitacion (nombre, descripcion, cantidadPersonas, metrosCuadrados, precio, id_hotel) VALUES
('Habitación Estándar', 'Cómoda, ideal para viajeros.', 2, 22, 120, 19),
('Suite Ejecutiva', 'Con escritorio y área de estar.', 2, 32, 160, 19),

('Habitación Clásica', 'Decoración sencilla y funcional.', 2, 25, 130, 20),
('Suite Caballito', 'Con balcón y baño privado.', 3, 36, 190, 20),

('Habitación Económica', 'Accesible y confortable.', 2, 20, 100, 21),
('Suite La Perla', 'Ambiente elegante y espacioso.', 3, 35, 160, 21);

-- ALMAGRO
INSERT INTO TipoHabitacion (nombre, descripcion, cantidadPersonas, metrosCuadrados, precio, id_hotel) VALUES
('Habitación Simple', 'Habitación básica con cama doble.', 2, 20, 90, 22),
('Suite Cid', 'Amplia, con minibar y vista a la avenida.', 2, 30, 140, 22),

('Habitación Estándar', 'Cómoda y luminosa.', 2, 24, 120, 23),
('Suite Corrientes', 'Decoración clásica y elegante.', 3, 38, 180, 23),

('Habitación Económica', 'Ideal para estadías cortas.', 2, 18, 80, 24),
('Suite Suipacha', 'Mayor espacio y baño moderno.', 3, 32, 130, 24);

-- VILLA DEVOTO
INSERT INTO TipoHabitacion (nombre, descripcion, cantidadPersonas, metrosCuadrados, precio, id_hotel) VALUES
('Habitación Familiar', 'Espaciosa con camas twin.', 3, 30, 120, 25),
('Suite Devoto', 'Suite con jacuzzi y balcón.', 2, 40, 180, 25),

('Habitación Estándar', 'Decoración moderna y funcional.', 2, 25, 140, 26),
('Suite Days', 'Amplia y luminosa, con kitchenette.', 3, 38, 190, 26),

('Habitación Boutique', 'Diseño exclusivo y elegante.', 2, 28, 160, 27),
('Suite Premium', 'Suite con terraza y hidromasaje.', 3, 42, 220, 27);

-- VILLA DEL PARQUE
INSERT INTO TipoHabitacion (nombre, descripcion, cantidadPersonas, metrosCuadrados, precio, id_hotel) VALUES
('Habitación Estándar', 'Cálida y confortable.', 2, 24, 120, 28),
('Suite Parque', 'Con vista al jardín y sala de estar.', 3, 38, 180, 28),

('Habitación Familiar', 'Dos camas queen y cocina pequeña.', 4, 35, 160, 29),
('Suite Andes', 'Suite elegante con jacuzzi.', 2, 40, 200, 29),

('Habitación Básica', 'Económica, ideal para una persona.', 1, 18, 90, 30),
('Suite Del Parque', 'Suite amplia con balcón privado.', 3, 35, 150, 30);



-- HABITACIONES
-- Cada tipo de habitación tiene 5 unidades físicas

INSERT INTO Habitacion (idHabitacion, numero, idTipoHabitacion) VALUES
-- Hotel 1: Palo Santo (Tipo 1 y 2)
(1,101,1),(2,102,1),(3,103,1),(4,104,1),(5,105,1),
(6,201,2),(7,202,2),(8,203,2),(9,204,2),(10,205,2),

-- Hotel 2: Vitrum (Tipo 3 y 4)
(11,301,3),(12,302,3),(13,303,3),(14,304,3),(15,305,3),
(16,401,4),(17,402,4),(18,403,4),(19,404,4),(20,405,4),

-- Hotel 3: Home Hotel (Tipo 5 y 6)
(21,501,5),(22,502,5),(23,503,5),(24,504,5),(25,505,5),
(26,601,6),(27,602,6),(28,603,6),(29,604,6),(30,605,6),

-- Hotel 4: Alvear Palace (Tipo 7 y 8)
(31,701,7),(32,702,7),(33,703,7),(34,704,7),(35,705,7),
(36,801,8),(37,802,8),(38,803,8),(39,804,8),(40,805,8),

-- Hotel 5: Loi Suites (Tipo 9 y 10)
(41,901,9),(42,902,9),(43,903,9),(44,904,9),(45,905,9),
(46,1001,10),(47,1002,10),(48,1003,10),(49,1004,10),(50,1005,10),

-- Hotel 6: Recoleta Grand (Tipo 11 y 12)
(51,1101,11),(52,1102,11),(53,1103,11),(54,1104,11),(55,1105,11),
(56,1201,12),(57,1202,12),(58,1203,12),(59,1204,12),(60,1205,12),

-- Hotel 7: Hotel Plaza (Tipo 13 y 14)
(61,1301,13),(62,1302,13),(63,1303,13),(64,1304,13),(65,1305,13),
(66,1401,14),(67,1402,14),(68,1403,14),(69,1404,14),(70,1405,14),

-- Hotel 8: NH Buenos Aires 9 de Julio (Tipo 15 y 16)
(71,1501,15),(72,1502,15),(73,1503,15),(74,1504,15),(75,1505,15),
(76,1601,16),(77,1602,16),(78,1603,16),(79,1604,16),(80,1605,16),

-- Hotel 9: Sofitel Buenos Aires (Tipo 17 y 18)
(81,1701,17),(82,1702,17),(83,1703,17),(84,1704,17),(85,1705,17),
(86,1801,18),(87,1802,18),(88,1803,18),(89,1804,18),(90,1805,18),

-- Hotel 10: Faena Hotel (Tipo 19 y 20)
(91,1901,19),(92,1902,19),(93,1903,19),(94,1904,19),(95,1905,19),
(96,2001,20),(97,2002,20),(98,2003,20),(99,2004,20),(100,2005,20),

-- Hotel 11: Madero Hotel (Tipo 21 y 22)
(101,2101,21),(102,2102,21),(103,2103,21),(104,2104,21),(105,2105,21),
(106,2201,22),(107,2202,22),(108,2203,22),(109,2204,22),(110,2205,22),

-- Hotel 12: Hilton (Tipo 23 y 24)
(111,2301,23),(112,2302,23),(113,2303,23),(114,2304,23),(115,2305,23),
(116,2401,24),(117,2402,24),(118,2403,24),(119,2404,24),(120,2405,24),

-- Hotel 13: Boca Juniors (Tipo 25 y 26)
(121,2501,25),(122,2502,25),(123,2503,25),(124,2504,25),(125,2505,25),
(126,2601,26),(127,2602,26),(128,2603,26),(129,2604,26),(130,2605,26),

-- Hotel 14: Babel (Tipo 27 y 28)
(131,2701,27),(132,2702,27),(133,2703,27),(134,2704,27),(135,2705,27),
(136,2801,28),(137,2802,28),(138,2803,28),(139,2804,28),(140,2805,28),

-- Hotel 15: Telmho (Tipo 29 y 30)
(141,2901,29),(142,2902,29),(143,2903,29),(144,2904,29),(145,2905,29),
(146,3001,30),(147,3002,30),(148,3003,30),(149,3004,30),(150,3005,30),

-- Hotel 16: Palacio San Miguel (Tipo 31 y 32)
(151,3101,31),(152,3102,31),(153,3103,31),(154,3104,31),(155,3105,31),
(156,3201,32),(157,3202,32),(158,3203,32),(159,3204,32),(160,3205,32),

-- Hotel 17: Cristoforo Colombo (Tipo 33 y 34)
(161,3301,33),(162,3302,33),(163,3303,33),(164,3304,33),(165,3305,33),
(166,3401,34),(167,3402,34),(168,3403,34),(169,3404,34),(170,3405,34),

-- Hotel 18: Hotel Belgrano (Tipo 35 y 36)
(171,3501,35),(172,3502,35),(173,3503,35),(174,3504,35),(175,3505,35),
(176,3601,36),(177,3602,36),(178,3603,36),(179,3604,36),(180,3605,36),

-- Hotel 19: Bisonte (Tipo 37 y 38)
(181,3701,37),(182,3702,37),(183,3703,37),(184,3704,37),(185,3705,37),
(186,3801,38),(187,3802,38),(188,3803,38),(189,3804,38),(190,3805,38),

-- Hotel 20: Continental (Tipo 39 y 40)
(191,3901,39),(192,3902,39),(193,3903,39),(194,3904,39),(195,3905,39),
(196,4001,40),(197,4002,40),(198,4003,40),(199,4004,40),(200,4005,40),

-- Hotel 21: La Perla (Tipo 41 y 42)
(201,4101,41),(202,4102,41),(203,4103,41),(204,4104,41),(205,4105,41),
(206,4201,42),(207,4202,42),(208,4203,42),(209,4204,42),(210,4205,42),

-- Hotel 22: Cid (Tipo 43 y 44)
(211,4301,43),(212,4302,43),(213,4303,43),(214,4304,43),(215,4305,43),
(216,4401,44),(217,4402,44),(218,4403,44),(219,4404,44),(220,4405,44),

-- Hotel 23: El Conquistador (Tipo 45 y 46)
(221,4501,45),(222,4502,45),(223,4503,45),(224,4504,45),(225,4505,45),
(226,4601,46),(227,4602,46),(228,4603,46),(229,4604,46),(230,4605,46),

-- Hotel 24: Suipacha (Tipo 47 y 48)
(231,4701,47),(232,4702,47),(233,4703,47),(234,4704,47),(235,4705,47),
(236,4801,48),(237,4802,48),(238,4803,48),(239,4804,48),(240,4805,48),

-- Hotel 25: Devoto Hotel (Tipo 49 y 50)
(241,4901,49),(242,4902,49),(243,4903,49),(244,4904,49),(245,4905,49),
(246,5001,50),(247,5002,50),(248,5003,50),(249,5004,50),(250,5005,50),

-- Hotel 26: Days Inn Devoto (Tipo 51 y 52)
(251,5101,51),(252,5102,51),(253,5103,51),(254,5104,51),(255,5105,51),
(256,5201,52),(257,5202,52),(258,5203,52),(259,5204,52),(260,5205,52),

-- Hotel 27: Boutique Devoto (Tipo 53 y 54)
(261,5301,53),(262,5302,53),(263,5303,53),(264,5304,53),(265,5305,53),
(266,5401,54),(267,5402,54),(268,5403,54),(269,5404,54),(270,5405,54),

-- Hotel 28: Villa del Parque (Tipo 55 y 56)
(271,5501,55),(272,5502,55),(273,5503,55),(274,5504,55),(275,5505,55),
(276,5601,56),(277,5602,56),(278,5603,56),(279,5604,56),(280,5605,56),

-- Hotel 29: Los Andes (Tipo 57 y 58)
(281,5701,57),(282,5702,57),(283,5703,57),(284,5704,57),(285,5705,57),
(286,5801,58),(287,5802,58),(288,5803,58),(289,5804,58),(290,5805,58),

-- Hotel 30: Hotel del Parque (Tipo 59 y 60)
(291,5901,59),(292,5902,59),(293,5903,59),(294,5904,59),(295,5905,59),
(296,6001,60),(297,6002,60),(298,6003,60),(299,6004,60),(300,6005,60);
