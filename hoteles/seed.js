// seed.js — Inserta datos ficticios en la tabla "hoteles"
const faker = require('faker');
const mysql = require('mysql2/promise');
require('dotenv').config();

(async () => {
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'hoteles_caba'
  });

  await conn.query(`CREATE TABLE IF NOT EXISTS hoteles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255),
    sector VARCHAR(100),
    precio DECIMAL(10,2),
    estrellas INT,
    descripcion TEXT,
    imagen VARCHAR(400)
  )`);

  await conn.query('TRUNCATE TABLE hoteles');

  const sectores = ['Palermo', 'Recoleta', 'San Telmo', 'Belgrano', 'Microcentro', 'Puerto Madero'];
  for (let i = 0; i < 60; i++) {
    const sector = sectores[i % sectores.length];
    const nombre = `${sector} Hotel ${i + 1}`;
    const precio = faker.commerce.price(10000, 90000);
    const estrellas = Math.floor(2 + Math.random() * 3);
    const descripcion = faker.lorem.sentence();
    const imagen = `https://picsum.photos/seed/${i}/400/300`;

    await conn.query(
      'INSERT INTO hoteles (nombre, sector, precio, estrellas, descripcion, imagen) VALUES (?, ?, ?, ?, ?, ?)',
      [nombre, sector, precio, estrellas, descripcion, imagen]
    );
  }

  console.log('✅ Seed completado');
  await conn.end();
})();
