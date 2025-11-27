// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const path = require('path');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 3000;



app.use(cors(
  {
    origin:["http://localhost:5000","http://localhost:5173","http://localhost:5000/register","http://localhost:3000","https://marvelous-respect-production.up.railway.app","*"]
  }
));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));
console.log("MYSQLHOST:", process.env.MYSQLHOST);
console.log("MYSQLPORT:", process.env.MYSQLPORT);
// 🔹 Conexión MySQL
const db = mysql.createConnection({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT
});

db.connect(err => {
  if (err) {
    console.error('❌ Error al conectar a MySQL:', err);
    process.exit(1);
  }
  console.log('✅ Conectado a MySQL');
});

// ------------------------ Configurar Nodemailer ------------------------------------------
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
});


// Endpoint para iniciar sesión
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const queryl = 'INSERT INTO historial (idUsuario, fechaGuardado, accion, id_hotel) values(?, Now(), ?, 1)'
  const query = 'SELECT * FROM usuario WHERE email = ?';
  db.query(query, [email], (err, results) => {
      if (err) return res.status(500).send('Error al realizar la consulta');
      if (results.length === 0) return res.status(400).send('Usuario no encontrado');

      const user = results[0];
      bcrypt.compare(password, user.pass, (err, isMatch) => {
          if (err) return res.status(500).send('Error de autenticación');
          if (!isMatch) return res.status(400).send('Contraseña incorrecta');
          db.query(queryl, [user.idUsuario, "El usuario inicio sesion"]);
          // Crear token JWT
          const token = jwt.sign({ id: user.idUsuario }, process.env.SECRET_KEY, { expiresIn: '5h' });
          res.status(200).json({ token });
      });
  });
});

// Endpoint para registrar un usuario
app.post('/register', (req, res) => {
  const { email, password, nombre, telefono, documento } = req.body;

  // Encriptar la contraseña
  bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).send('Error al encriptar la contraseña');

      const query = 'INSERT INTO usuario (nombre, email, pass, telefono, documento) VALUES (?, ?, ?, ?, ?)';
      db.query(query, [nombre, email, hashedPassword, telefono, documento], (err, results) => {
          if (err) {
              console.error("🚨 ERROR EN REGISTRO:", err);
              if (err.code === 'ER_DUP_ENTRY') {
                  return res.status(400).send('El correo ya está registrado');
              }
              return res.status(500).send('Error al registrar el usuario');
          }
          res.status(200).send('Usuario registrado correctamente');
      });
  });
});

app.get('/profile', (req, res) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).send('Token requerido');

  const token = authHeader.split(" ")[1]; // separa "Bearer TOKEN"

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).send('Token inválido');

    const query = 'SELECT nombre, email FROM usuario WHERE idUsuario = ?';
    db.query(query, [decoded.id], (err, results) => {
      if (err) return res.status(500).send('Error en la consulta');
      res.status(200).json(results[0]);
    });
  });
});

// ================================
// Hoteles (sin cambios)
// ================================
app.get('/api/hotels', (req, res) => {
  let { q, barrio, sort, page = 1, perPage = 12 } = req.query;
  page = parseInt(page);
  perPage = parseInt(perPage);
  let where = 'WHERE 1=1';
  const params = [];

  if (q) {
    where += ' AND h.nombre LIKE ?';
    params.push(`%${q}%`);
  }
  if (barrio) {
    where += ' AND b.nombre = ?';
    params.push(barrio);
  }

  let orderBy = '';
  if (sort === 'rating') orderBy = 'ORDER BY h.estrellas DESC';
  const offset = (page - 1) * perPage;

  const countSql = `
    SELECT COUNT(*) AS total
    FROM hoteles h
    JOIN barrio b ON h.barrio_id = b.barrio_id
    ${where}
  `;
  const dataSql = `
    SELECT h.id, h.nombre, h.estrellas, h.descripcion, h.imagen,
           h.direccion, h.precio, h.categoria, b.nombre AS barrio
    FROM hoteles h
    JOIN barrio b ON h.barrio_id = b.barrio_id
    ${where}
    ${orderBy}
    LIMIT ? OFFSET ?;
  `;

  db.query(countSql, params, (err, countResults) => {
    if (err) return res.status(500).json({ error: err.message });
    const total = countResults[0].total;

    db.query(dataSql, [...params, perPage, offset], (err, dataResults) => {
      if (err) return res.status(500).json({ error: err.message });

      const hotels = dataResults.map(hotel => ({
        ...hotel,
        imagen: hotel.imagen?.startsWith('http')
          ? hotel.imagen
          : `http://localhost:${port}/images/${hotel.imagen}`
      }));
      res.json({ hotels, total });
    });
  });
});

app.get('/api/barrio', (req, res) => {
  db.query('SELECT nombre FROM barrio ORDER BY nombre ASC', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


app.get('/api/hotelD', (req, res) => {
  let {id} = req.query;
  let consulta =
  `SELECT h.id, h.nombre, h.estrellas, h.descripcion, h.imagen, h.direccion, h.precio, h.categoria, h.mapa 
  FROM hoteles h
  `;

  if(id){
    consulta += ' where h.id='+ id;
  }
  db.query(consulta, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/api/HotelTipoH', (req, res) => {
  let {id} = req.query;
  let consultaTH =
  `select  T.idTipoHabitacion, T.id_hotel, T.nombre, T.descripcion, T.cantidadPersonas, T.metrosCuadrados, count(h.idTipoHabitacion) as 'CantidadHabitaciones'
  from TipoHabitacion T
  join Habitacion h on T.idTipoHabitacion = h.idTipoHabitacion
  `;

  if(id){
    consultaTH+= 'where T.id_hotel='+ id+' ';
    consultaTH+='group by T.idTipoHabitacion'
  }
  db.query(consultaTH, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get('/api/HistorialU', (req,res) =>{
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).send('Token requerido');

  const token = authHeader.split(" ")[1]; // separa "Bearer TOKEN"

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).send('Token inválido');
    
    const query = `SELECT h.idHistorial, h.idUsuario, h.fechaGuardado, h.accion, h.id_hotel as 'idHotel' 
    FROM historial h 
    WHERE idUsuario = ?
    order by h.idHistorial desc`;
    db.query(query, [decoded.id], (err, results) => {
      if (err) return res.status(500).send('Error en la consulta');
      res.status(200).json(results);
      
    });
  });
})
// -----------------------------------------Historial--------------------------------------------------

app.get('/api/HistorialU/Hotel', (req,res) =>{
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).send('Token requerido');
  console.log(req.query);
  const {idh}= req.query;
  const token = authHeader.split(" ")[1]; // separa "Bearer TOKEN"

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).send('Token inválido');
    
    const query = 'INSERT INTO historial (idUsuario, fechaGuardado, accion, id_hotel) values(?, Now(), ?, ?)'
    db.query(query, [decoded.id, "El usuario visito un hotel", idh], (err, results) => {
      if (err) return res.status(500).send('Error en la consulta');
      res.status(200).json(results);
      
    });
  });
})

app.get('/api/Hotel/Comentarios', (req,res) =>{
  const {idh}= req.query;
  const query = `SELECT c.idCalficacion, c.idUsuario, c.id_hotel as "idHotel", c.comentario, c.estrellas, u.nombre , u.email
    FROM calificacion c
    inner join usuario u on c.idUsuario=u.idUsuario
    where c.id_hotel=${idh}`;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
})

app.listen(port, "0.0.0.0", () =>
  console.log(`🚀 Servidor corriendo en PORT ${port}`)
);