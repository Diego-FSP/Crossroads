
// script.js — Cliente frontend de HotelesBA
const API_BASE = 'http://localhost:3000/api';

const searchInput = document.getElementById('searchInput');
const barrioSelect = document.getElementById('sectorSelect');
const sortSelect = document.getElementById('sortSelect') || { value: 'recommended' };
const searchBtn = document.getElementById('searchBtn');
const cardsArea = document.getElementById('cardsArea');
const paginationDiv = document.getElementById('pagination');
const hotelTpl = document.getElementById('hotelCardTpl');

let currentPage = 1;
let totalResults = 0;
let perPage = 12;

// ------------------------
// 🔹 Cargar barrios dinámicamente
// ------------------------
export async function loadSectors() {
  try {
    const res = await fetch(`${API_BASE}/barrio`);
    const data = await res.json();

    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.textContent = 'Todos los barrios';
    barrioSelect.innerHTML = '';
    barrioSelect.appendChild(defaultOpt);

    data.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.nombre;
      opt.textContent = s.nombre;
      barrioSelect.appendChild(opt);
    });
  } catch (err) {
    console.error('Error al cargar barrios:', err);
  }
}

// ------------------------
// 🔹 Cargar hoteles con filtros
// ------------------------
export async function loadHotels(page = 1) {
  const q = searchInput.value.trim();
  const barrio = barrioSelect.value;
  const sortVal = sortSelect.value;

  let sort = '';
  if (sortVal === 'rating_desc') sort = 'rating';

  const params = new URLSearchParams({
    q,
    barrio,
    sort,
    page,
    perPage
  });

  try {
    const res = await fetch(`${API_BASE}/hotels?${params}`);
    const data = await res.json();

    console.log('Hoteles recibidos:', data.hotels);

    cardsArea.innerHTML = '';

    if (!data.hotels || data.hotels.length === 0) {
      cardsArea.innerHTML = '<p class="no-results">No se encontraron hoteles.</p>';
      paginationDiv.innerHTML = '';
      return;
    }

    data.hotels.forEach(hotel => {
      const card = hotelTpl.content.cloneNode(true);

      const img = card.querySelector('img');
      img.src = hotel.imagen || 'https://via.placeholder.com/400x300?text=Sin+imagen';
      img.alt = hotel.nombre;

      card.querySelector('.hotel-name').textContent = hotel.nombre;
      card.querySelector('.hotel-sector').textContent = hotel.barrio;
      card.querySelector('.rating').textContent = '⭐'.repeat(hotel.estrellas || 0);

      cardsArea.appendChild(card);
    });

    totalResults = data.total || data.hotels.length;
    renderPagination(page);
  } catch (err) {
    console.error('Error al cargar hoteles:', err);
  }
}

// ------------------------
// 🔹 Renderizar paginación
// ------------------------
export function renderPagination(page) {
  const totalPages = Math.ceil(totalResults / perPage);
  paginationDiv.innerHTML = '';

  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = i === page ? 'active' : '';
    btn.addEventListener('click', () => {
      currentPage = i;
      loadHotels(i);
    });
    paginationDiv.appendChild(btn);
  }
}

// ------------------------
// 🔹 Listeners de búsqueda y filtros
// ------------------------
