import { useRef } from "react"

export function Barra(){
    const AreaRegistro = useRef(null);
    const AreaSesion = useRef(null);

    const abrirRegistro=() =>{
        console.log("RegistroActivado")
        console.log(AreaRegistro.current.id);
        AreaRegistro.current.style.display = "flex";
    }

    const cerrarRegistro=() =>{
        console.log("RegistroDesactivado")
        AreaRegistro.current.style.display = "none";
    }

    const abrirSesion=() =>{
        console.log("IniciarSecion")
        AreaSesion.current.style.display = "flex";
    }

    const cerrarSesion=() =>{
        console.log("DesactivarSecion")
        AreaSesion.current.style.display = "none";
    }

    return(
        <header className="site-header">
        <div className="brand">CABA<span className="accent">Crossroads</span></div>
        <nav className="top-controls">
            <div className="user-auth-buttons">
            <button className="auth-btn register-btn" id="openRegisterModalBtn" onClick={() =>abrirRegistro()}>Registrarse</button>
            <button className="auth-btn login-btn" id="loginBtn" onClick={() =>abrirSesion()}>Iniciar sesión</button> 
            </div>
        </nav>
        

        <div id="RegistroTargeta" ref={AreaRegistro}>
            <div className="Targeta">
                <div id="TituloForm">
                    <h2>Crear cuenta</h2>
                    <span className="BotonCerrar" id="RegistroBotonCerrar" onClick={() =>cerrarRegistro()}>x</span>
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
                    
                    <button type="submit" className="auth-btn login-btn">Crear cuenta</button>
                </form>
            </div>
        </div>

        <div id="SecionTargeta" ref={AreaSesion}>
            <div className="Targeta">
                <div id="TituloForm">
                    <h2>Iniciar Sesion</h2>
                    <span className="BotonCerrar" id="SecionBotonCerrar" onClick={() =>cerrarSesion()}>x</span>
                </div>
                <form id="SesionForm">
                    <div>
                        <label htmlFor="loginEmail">Correo electrónico: </label>
                        <input type="email" id="loginEmail" name="loginEmail" required placeholder="correo@ejemplo.com" />
                    </div>
                    <div>
                        <label htmlFor="loginPassword">Contraseña: </label>
                        <input type="password" id="loginPassword" name="loginPassword" required placeholder="Contraseña" />
                    </div>
                    <button type="submit" className="auth-btn login-btn" >Iniciar sesión</button>
                </form>
            </div>
        </div>

        </header>
    )
}