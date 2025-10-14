// seed.js — Inserta 300 hoteles con imágenes locales
// Instalar dependencias: npm i faker mysql2 dotenv
const faker = require('faker');
const mysql = require('mysql2/promise');
require('dotenv').config();

(async ()=>{
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });

  const sectors = ['Palermo','Recoleta','San Telmo','Belgrano','Microcentro','Puerto Madero'];

  // Crear tabla si no existe
  await conn.query(`
    CREATE TABLE IF NOT EXISTS hotels (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255),
      sector VARCHAR(100),
      description TEXT,
      price INT,
      rating DECIMAL(3,1),
      stars INT,
      image VARCHAR(512)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // Limpiar la tabla
  await conn.query('TRUNCATE TABLE hotels');

  // 10 imágenes base locales
  const images = [];
  for (let i = 1; i <= 10; i++) {
    images.push(`/images/hotel${i}.jpg`);
  }

  // Insertar 300 hoteles (6 sectores × 50)
  const total = 300;
  for (let i = 0; i < total; i++) {
    const sector = sectors[Math.floor(i / 50)];
    const idx = (i % 50) + 1;
    const name = `${sector} Hotel ${String(idx).padStart(3,'0')}`;
    const desc = faker.lorem.sentences(2);
    const price = Math.floor(8000 + Math.random() * 90000);
    const rating = (7 + Math.random() * 3).toFixed(1);
    const stars = Math.floor(2 + Math.random() * 3);
    const image = images[i % images.length]; // rota entre hotel1.jpg a hotel10.jpg

    await conn.query(
      'INSERT INTO hotels (name, sector, description, price, rating, stars, image) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, sector, desc, price, rating, stars, image]
    );
  }

  console.log('✅ Seed completado: 300 hoteles insertados con imágenes locales.');
  await conn.end();
})();
