// server.js
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Cambia por tu password
  database: "hotelesBA"
});

db.connect(err => {
  if (err) {
    console.error("Error de conexión:", err);
    return;
  }
  console.log("Conectado a MySQL");
});

// Ruta para obtener hoteles junto con sector
app.get("/hoteles", (req, res) => {
  const sql = `
    SELECT h.*, s.nombre AS sector_nombre
    FROM hoteles h
    LEFT JOIN sectores s ON h.sector_id = s.id
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send("Error al obtener hoteles");
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
