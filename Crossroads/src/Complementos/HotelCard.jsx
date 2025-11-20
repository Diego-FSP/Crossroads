import { useRef, useEffect, useState } from 'react';
import {DetalleHotel} from './DetalleHotel.jsx'

export function HotelCard() {
  const API_BASE = 'http://localhost:5000/api';

  // 🔹 Estados
  const [hoteles, setHoteles] = useState([]);
  const [barrios, setBarrios] = useState([]);
  const [barrio, setBarrio] = useState('');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('recommended');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const perPage = 12;
  const AreaDetalle = useRef(null);
  const [IDH, setIDH]= useState(1);
  // ------------------------
  // 🔹 Cargar barrios
  // ------------------------
  useEffect(() => {
    async function loadSectors() {
      try {
        const res = await fetch(`${API_BASE}/barrio`);
        const data = await res.json();
        setBarrios(data);
      } catch (err) {
        console.error('Error al cargar barrios:', err);
      }
    }
    loadSectors();
  }, []);

  // ------------------------
  // 🔹 Cargar hoteles
  // ------------------------
  useEffect(() => {
    async function loadHotels() {
      try {
        const params = new URLSearchParams({
          q: query,
          barrio,
          sort: sort === 'rating_desc' ? 'rating' : '',
          page: currentPage,
          perPage,
        });

        const res = await fetch(`${API_BASE}/hotels?${params}`);
        const data = await res.json();

        setHoteles(data.hotels || []);
        setTotalResults(data.total || data.hotels?.length || 0);
      } catch (err) {
        console.error('Error al cargar hoteles:', err);
        setHoteles([]);
      }
    }

    loadHotels();
  }, [query, barrio, sort, currentPage]);

  // ------------------------
  // 🔹 Calcular total de páginas
  // ------------------------
  const totalPages = Math.ceil(totalResults / perPage);

  // ------------------------
  // 🔹 Renderizado JSX
  const abrirDetalle = (ID) =>{
    console.log("mostrar detalle del hotel n°"+ID)
    setIDH(ID);
  }
  // ------------------------
  return (
    <main className="container">
      {/* Filtros */}
      <section className="filters">
        <input id="buscador"
          type="text"
          placeholder="Buscar hotel..."
          value={query}
          onChange={(e) => {
            setCurrentPage(1);
            setQuery(e.target.value);
          }}
        />

        <select id="listaBarrios"
          value={barrio}
          onChange={(e) => {
            setCurrentPage(1);
            setBarrio(e.target.value);
          }}
        >
          <option  value="">Todos los barrios</option>
          {barrios.map((b) => (
            <option key={b.id || b.nombre} value={b.nombre}>
              {b.nombre}
            </option>
          ))}
        </select>

        <select id="listaCalificaciones"
          value={sort}
          onChange={(e) => {
            setCurrentPage(1);
            setSort(e.target.value);
          }}
        >
          <option value="recommended">Recomendados</option>
          <option value="rating_desc">Mejor calificación</option>
        </select>
      </section>

      {/* Tarjetas de hoteles */}
      <section className="cards-area">
        <div className="cartasHoteles">
          {hoteles.length === 0 ? (
            <p>No se encontraron hoteles.</p>
          ) : (
            hoteles.map((h) => (
              <article className="HotelCarta" key={h.id} onClick={() =>abrirDetalle(h.id)}>
                <div className="media">
                  <img
                    src={h.imagen || 'https://via.placeholder.com/400x300?text=Sin+imagen'}
                    alt={h.nombre}
                  />
                  <div className="rating">{'⭐️'.repeat(h.estrellas || 0)}</div>
                </div>
                <div className="CuerpoCarta">
                  <h3 className="NombreHotel">{h.nombre}</h3>
                  <p className="hotel-sector">{h.barrio}</p>
                  <div className="meta">
                    <span className="price">
                      <strong>Desde: {h.precio}$</strong>
                    </span>
                  </div>
                    <span>
                      Categoria: {h.categoria}
                    </span>
                  <div>
                      {h.direccion}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {/* 🔹 Paginación */}
      {totalPages > 1 && (
        <div className="PaginasCard">
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            return (
              <button
                key={page}
                className={page === currentPage ? 'active' : ''}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            );
          })}
        </div>
      )}
      <div  ref={AreaDetalle}>
        <DetalleHotel ID={IDH}></DetalleHotel>
      </div>
      
    </main>
  );
}
