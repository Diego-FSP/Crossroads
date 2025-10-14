require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');
const app = express();
app.use(express.json());


const pool = mysql.createPool({
host: process.env.DB_HOST || 'localhost',
user: process.env.DB_USER || 'root',
password: process.env.DB_PASS || '',
database: process.env.DB_NAME || 'hoteles_caba',
waitForConnections: true,
connectionLimit: 10,
queueLimit: 0
});


app.get('/api/hotels', async (req,res)=>{
try{
const q = (req.query.q||'').trim();
const sector = (req.query.sector||'').trim();
const sort = req.query.sort||'recommended';
const page = parseInt(req.query.page)||1;
const perPage = parseInt(req.query.perPage)||12;
const offset = (page-1)*perPage;


const where = [];
const params = [];
if(q){ where.push('(name LIKE ? OR description LIKE ?)'); params.push(`%${q}%`, `%${q}%`); }
if(sector){ where.push('sector = ?'); params.push(sector); }
const whereSQL = where.length ? ('WHERE ' + where.join(' AND ')) : '';


let orderSQL = 'ORDER BY id LIMIT ? OFFSET ?';
if(sort==='price_asc') orderSQL = 'ORDER BY price ASC LIMIT ? OFFSET ?';
if(sort==='price_desc') orderSQL = 'ORDER BY price DESC LIMIT ? OFFSET ?';
if(sort==='rating_desc') orderSQL = 'ORDER BY rating DESC LIMIT ? OFFSET ?';


// total
const [countRows] = await pool.query(`SELECT COUNT(*) as c FROM hotels ${whereSQL}`, params);
const total = countRows[0].c || 0;


// fetch
params.push(perPage, offset);
const [rows] = await pool.query(`SELECT id, name, sector, price, rating, stars, image FROM hotels ${whereSQL} ${orderSQL}`, params);


res.json({ total, hotels: rows });
}catch(e){
console.error(e);
res.status(500).json({ error: 'error interno' });
}
});


const port = process.env.PORT || 3000;
app.listen(port, ()=> console.log('API en http://localhost:'+port));