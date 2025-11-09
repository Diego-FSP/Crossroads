export function Registro(){
    return(
        <div id="RegistroTargeta">
            <div className="Targeta">
                <div id="TituloForm">
                    <h2>Crear cuenta</h2>
                    <span className="BotonCerrar" id="RegistroBotonCerrar">x</span>
                </div>
                <form id="RegistroForm">
                    <div>
                        <label htmlFor="email">Correo electrónico: </label>
                        <input type="email" id="email" name="email" required placeholder="correo@ejemplo.com" />
                    </div>

                    <div>
                        <label htmlFor="password">Contraseña: </label>
                        <input type="password" id="password" name="password" required placeholder="Contraseña" />
                    </div>
                    
                    <div>
                        <label htmlFor="confirmPassword">Repetir contraseña: </label>
                        <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="Repetir contraseña" />
                    </div>
                    
                    <button type="submit">Crear cuenta</button>
                </form>
            </div>
        </div>
    )
}   