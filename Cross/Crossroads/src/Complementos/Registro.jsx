export function Registro(){
    return(
        <div id="RegistroTargeta">
        <div class="Targeta">
            <div id="TituloForm">
                <h2>Crear cuenta</h2>
                <span class="BotonCerrar" id="RegistroBotonCerrar">x</span>
            </div>
            <form id="RegistroForm">
                <div>
                    <label for="email">Correo electrónico: </label>
                    <input type="email" id="email" name="email" required placeholder="correo@ejemplo.com" />
                </div>
                <div>
                    <label for="password">Contraseña: </label>
                    <input type="password" id="password" name="password" required placeholder="Contraseña" />
                </div>
                <div>
                    <label for="confirmPassword">Repetir contraseña: </label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="Repetir contraseña" />
                </div>
                <button type="submit">Crear cuenta</button>
            </form>
        </div>
        </div>
    )
}   