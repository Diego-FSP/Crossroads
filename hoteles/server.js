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
  user: "root",       // tu usuario de MySQL
  password: "",       // tu contraseña de MySQL
  database: "hoteles_caba"
});

db.connect(err => {
  if (err) {
    console.error("Error de conexión:", err);
    return;
  }
  console.log("Conectado a MySQL");
});

// Ruta para obtener todos los hoteles
app.get("/hoteles", (req, res) => {
  db.query("SELECT * FROM hoteles", (err, results) => {
    if (err) {
      res.status(500).send("Error al obtener hoteles");
    } else {
      res.json(results);
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
