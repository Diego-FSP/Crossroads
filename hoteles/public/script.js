// script.js — Cliente frontend de HotelesBA
const API_BASE = 'http://localhost:3000/api';

const searchInput = document.getElementById('searchInput');
const barrioSelect = document.getElementById('sectorSelect');
const sortSelect = document.getElementById('sortSelect');
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
async function loadSectors() {
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
async function loadHotels(page = 1) {
  const q = searchInput.value.trim();
  const barrio = barrioSelect.value;
  const sortVal = sortSelect.value;

  let sort = '';
  if (sortVal === 'rating_desc') sort = 'rating';

  const params = new URLSearchParams({
    q,
    barrio, // ✅ nombre correcto del parámetro
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
      card.querySelector('.hotel-sector').textContent = hotel.barrio; // ✅ clase corregida
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

barrioSelect.addEventListener('change', () => {
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

const usuarioValido = {
  email: 'usuario@ejemplo.com',
  password: '123456'
};

openLoginBtn.addEventListener('click', () => {
  loginModal.style.display = 'block';
});

closeLoginBtn.addEventListener('click', () => {
  loginModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === loginModal) {
    loginModal.style.display = 'none';
  }
});

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
