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
// 🔹 Listeners de búsqueda y filtros
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
// 🔹 Modal de registro
// ------------------------
const registerModal = document.getElementById('registerModal');
const openRegisterBtn = document.getElementById('openRegisterModalBtn');
const closeRegisterBtn = document.getElementById('closeRegisterModalBtn');
const registerForm = document.getElementById('registerForm');

openRegisterBtn.addEventListener('click', () => {
  registerModal.style.display = 'block';
});

closeRegisterBtn.addEventListener('click', () => {
  registerModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === registerModal) {
    registerModal.style.display = 'none';
  }
});

registerForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = registerForm.email.value.trim();
  const password = registerForm.password.value.trim();
  const confirmPassword = registerForm.confirmPassword.value.trim();

  if (password !== confirmPassword) {
    alert('Las contraseñas no coinciden.');
    return;
  }

  alert(`Cuenta creada para: ${email}`);
  registerModal.style.display = 'none';
  registerForm.reset();
});

// ------------------------
// 🔹 Modal de inicio de sesión
// ------------------------
const loginModal = document.getElementById('loginModal');
const openLoginBtn = document.getElementById('loginBtn');
const closeLoginBtn = document.getElementById('closeLoginModalBtn');
const loginForm = document.getElementById('loginForm');

// Usuario de ejemplo (puedes cambiarlo por tu lógica real)
const usuarioValido = {
  email: 'usuario@ejemplo.com',
  password: '123456'
};

// Abrir el modal de inicio de sesión
openLoginBtn.addEventListener('click', () => {
  loginModal.style.display = 'block';
});

// Cerrar modal con la "X"
closeLoginBtn.addEventListener('click', () => {
  loginModal.style.display = 'none';
});

// Cerrar modal si se hace clic fuera
window.addEventListener('click', (event) => {
  if (event.target === loginModal) {
    loginModal.style.display = 'none';
  }
});

// Enviar formulario de inicio de sesión
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = loginForm.loginEmail.value.trim();
  const password = loginForm.loginPassword.value.trim();

  if (email === usuarioValido.email && password === usuarioValido.password) {
    alert('Inicio de sesión exitoso');
    loginModal.style.display = 'none';
    loginForm.reset();
  } else {
    alert('Correo o contraseña incorrectos.');
  }
});

// ------------------------
// 🔹 Inicialización
// ------------------------
loadSectors();
loadHotels();
