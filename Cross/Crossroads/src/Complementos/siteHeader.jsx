export function Barra(){
    return(
        <header class="site-header">
        <div class="brand">CABA<span class="accent">Crossroads</span></div>
        <nav class="top-controls">
            <div class="user-auth-buttons">
            <button class="auth-btn register-btn" id="openRegisterModalBtn">Registrarse</button>
            <button class="auth-btn login-btn" id="loginBtn">Iniciar sesión</button> 
            </div>
        </nav>
        </header>
    )
}