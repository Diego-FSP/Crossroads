// script.js — Frontend dinámico
const apiBase = '/api';
const cardsArea = document.getElementById('cardsArea');
const tpl = document.getElementById('hotelCardTpl');
const searchInput = document.getElementById('searchInput');
const sectorSelect = document.getElementById('sectorSelect');
const sortSelect = document.getElementById('sortSelect');
const searchBtn = document.getElementById('searchBtn');
const pagination = document.getElementById('pagination');

let page = 1, perPage = 12, totalPages = 1;

async function fetchHotels(){
  const q = encodeURIComponent(searchInput.value || '');
  const sector = encodeURIComponent(sectorSelect.value || '');
  const sort = encodeURIComponent(sortSelect.value || '');
  const res = await fetch(`${apiBase}/hotels?q=${q}&sector=${sector}&sort=${sort}&page=${page}&perPage=${perPage}`);
  if(!res.ok){
    cardsArea.innerHTML = '<p style="color:#f66">Error cargando hoteles</p>';
    return;
  }
  const data = await res.json();
  totalPages = Math.max(1, Math.ceil(data.total / perPage));
  renderHotels(data.hotels);
  renderPagination();
}

function renderHotels(hotels){
  cardsArea.innerHTML = '';
  hotels.forEach(h => {
    const node = tpl.content.cloneNode(true);
    // 🖼️ Si es una imagen local (/images/hotelX.jpg), la usa directamente
    node.querySelector('img').src = h.image.startsWith('/images')
      ? h.image
      : '/images/hotel1.jpg';
    node.querySelector('img').alt = h.name;
    node.querySelector('.rating').textContent = (h.rating || 8.6).toFixed(1);
    node.querySelector('.hotel-name').textContent = h.name;
    node.querySelector('.hotel-sector').textContent = h.sector + ' • ' + h.stars + '★';
    node.querySelector('.price').textContent = `$${Number(h.price).toLocaleString('es-AR')}`;
    node.querySelector('.viewBtn').addEventListener('click', ()=> alert('Ver oferta de ' + h.name));
    cardsArea.appendChild(node);
  });
}

function renderPagination(){
  pagination.innerHTML = '';
  const maxButtons = 8;
  const start = Math.max(1, page - Math.floor(maxButtons/2));
  for(let i=start; i<=Math.min(totalPages, start + maxButtons -1); i++){
    const btn = document.createElement('button');
    btn.textContent = i;
    if(i===page){
      btn.style.opacity = '0.6';
      btn.disabled = true;
    }
    btn.onclick = ()=>{ page = i; fetchHotels(); }
    pagination.appendChild(btn);
  }
}

searchBtn.addEventListener('click', ()=>{ page = 1; fetchHotels(); });
searchInput.addEventListener('keydown', e=>{ if(e.key==='Enter'){ page = 1; fetchHotels(); } });

// inicial
fetchHotels();
