export function Barra(){
    return(
        <header class="site-header">
        <div class="brand">CABA<span class="accent">Stay</span></div>
        <nav class="top-controls">
            <input id="searchInput" placeholder="Buscar hotel, barrio o palabra clave..." />
            <select id="sectorSelect">
            <option value="">Todos los barrios</option>
            <option>Palermo</option>
            <option>Recoleta</option>
            <option>San Telmo</option>
            <option>Belgrano</option>
            <option>Microcentro</option>
            <option>Puerto Madero</option>
            <option>Almagro</option>
            <option>Villa devoto</option>
            <option>Villa del Parque</option>
            </select>
            <button id="searchBtn">Buscar</button>

            
            <div class="user-auth-buttons">
            <button class="auth-btn register-btn" id="openRegisterModalBtn">Registrarse</button>
            <button class="auth-btn login-btn" id="loginBtn">Iniciar sesión</button> 
            </div>
        </nav>
        </header>
    )
}