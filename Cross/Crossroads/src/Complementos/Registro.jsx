export function Registro(){
    return(
        <div id="registerModal" class="modal">
        <div class="modal-content">
            <span class="close-btn" id="closeRegisterModalBtn">&times;</span>
            <h2>Crear cuenta</h2>
            <form id="registerForm">
            <label for="email">Correo electrónico</label>
            <input type="email" id="email" name="email" required placeholder="correo@ejemplo.com" />
            <label for="password">Contraseña</label>
            <input type="password" id="password" name="password" required placeholder="Contraseña" />
            <label for="confirmPassword">Repetir contraseña</label>
            <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="Repetir contraseña" />
            <button type="submit" class="auth-btn register-btn" style="width: 100%; margin-top: 15px;">Crear cuenta</button>
            </form>
        </div>
        </div>
    )
}   