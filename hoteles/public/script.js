// script.js — Cliente frontend de HotelesBA
const API_BASE = 'http://localhost:3000/api';

const searchInput = document.getElementById('searchInput');
const sectorSelect = document.getElementById('sectorSelect');
const sortSelect = document.getElementById('sortSelect');
const searchBtn = document.getElementById('searchBtn');
const cardsArea = document.getElementById('cardsArea');
const paginationDiv = document.getElementById('pagination');
const hotelTpl = document.getElementById('hotelCardTpl');

let currentPage = 1;
let totalResults = 0;
let perPage = 12;

// ------------------------
// 🔹 Cargar sectores dinámicamente
// ------------------------
async function loadSectors() {
  try {
    const res = await fetch(`${API_BASE}/sectores`);
    const data = await res.json();

    // Vacía las opciones actuales excepto "Todos los barrios"
    const defaultOpt = sectorSelect.querySelector('option[value=""]');
    sectorSelect.innerHTML = '';
    sectorSelect.appendChild(defaultOpt);

    data.forEach(s => {
      const opt = document.createElement('option');
      opt.value = s.nombre;
      opt.textContent = s.nombre;
      sectorSelect.appendChild(opt);
    });
  } catch (err) {
    console.error('Error al cargar sectores:', err);
  }
}

// ------------------------
// 🔹 Cargar hoteles con filtros
// ------------------------
async function loadHotels(page = 1) {
  const q = searchInput.value.trim();
  const sector = sectorSelect.value;
  const sortVal = sortSelect.value;

  let sort = '';
  if (sortVal === 'price_asc') sort = 'asc';
  if (sortVal === 'price_desc') sort = 'desc';
  if (sortVal === 'rating_desc') sort = 'rating';

  const params = new URLSearchParams({
    q,
    sector,
    sort,
    page,
    perPage
  });

  try {
    const res = await fetch(`${API_BASE}/hotels?${params}`);
    const data = await res.json();

    cardsArea.innerHTML = '';

    if (data.hotels.length === 0) {
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
      card.querySelector('.hotel-sector').textContent = hotel.sector;
      card.querySelector('.price').textContent = `$${hotel.precio}`;
      card.querySelector('.rating').textContent = '⭐'.repeat(hotel.estrellas);

      cardsArea.appendChild(card);
    });

    totalResults = data.total;
    renderPagination(page);
  } catch (err) {
    console.error('Error al cargar hoteles:', err);
  }
}

// ------------------------
// 🔹 Renderizar paginación
// ------------------------
function renderPagination(page) {
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
// 🔹 Listeners
// ------------------------
searchBtn.addEventListener('click', () => {
  currentPage = 1;
  loadHotels();
});

sortSelect.addEventListener('change', () => {
  currentPage = 1;
  loadHotels();
});

sectorSelect.addEventListener('change', () => {
  currentPage = 1;
  loadHotels();
});

// ------------------------
// 🔹 Inicialización
// ------------------------
loadSectors();
loadHotels();
