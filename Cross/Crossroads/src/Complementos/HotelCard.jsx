import { useEffect, useState } from 'react';

export function HotelCard() {
  const API_BASE = 'http://localhost:3000/api';
  const [hoteles, setHoteles] = useState([]);

  useEffect(() => {
    async function loadHotels() {
      try {
        const res = await fetch(`${API_BASE}/hotels`);
        const data = await res.json();
        setHoteles(data.hotels || []);
      } catch (err) {
        console.error('Error al cargar hoteles:', err);
        setHoteles([]);
      }
    }
    loadHotels();
  }, []);

  return (
    <main className='container' >
    <section class="cards-area">
        <div className="cartasHoteles">
        {hoteles.length === 0 ? (
            <p>No se encontraron hoteles.</p>
        ) : (
            hoteles.map((h) => (
            <article className="HotelCarta" key={h.id}>
                <div className="media">
                <img
                    src={h.imagen || 'https://via.placeholder.com/400x300'}
                    alt={h.nombre}
                />
                <div className="rating"> {'⭐️'.repeat(h.estrellas)}</div>
                </div>
                <div className="card-body">
                <h3 className="hotel-name">{h.nombre}</h3>
                <p className="hotel-sector">{h.barrio}</p>
                <div className="meta">
                    <span className="price">{h.precio ? `$${h.precio}` : 'Sin precio'}</span>
                    <button className="viewBtn">Ver oferta</button>
                </div>
                </div>
            </article>
            ))
        )}
        </div>
    </section>
    </main>
  );
}
// <div class="pagination" id="pagination"></div>