import { useRef, useState, useEffect } from "react"
import axios from 'axios';

export function Barra({estado, setestado}){
    const AreaRegistro = useRef(null);
    const AreaSesion = useRef(null);
    const [mensajeError, setMensajeError] = useState("");
    const [user, setUser] = useState(null);

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


    // Manejo del formulario de login
    const handleLogin = async (e) => {
        e.preventDefault();
        const email = e.target.loginEmail.value;
        const password = e.target.loginPassword.value;

        try {
            const response = await axios.post('http://localhost:5000/login', { email, password });
            const token = response.data.token;
            localStorage.setItem('token', token);  // Guardar el token en el localStorage
            const perfil = await axios.get("http://localhost:5000/profile", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUser(perfil.data);
            alert("Iniciado sesión exitosamente");
            cerrarSesion();
        } catch (error) {
            setMensajeError('Error al iniciar sesión. Verifique sus credenciales.');
        }
    };

    // Manejo del formulario de registro
    const handleRegister = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirmPassword = e.target.confirmPassword.value;
        const nombre = e.target.nombre.value; // Asegúrate de agregar el campo nombre en el formulario
        const telefono = e.target.telefono.value;
        const documento = e.target.documento.value;

        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden");
            return;
        }

        try {
            await axios.post('http://localhost:5000/register', { nombre, email, password, telefono, documento });
            alert("Usuario registrado exitosamente");
            cerrarRegistro();
        } catch (error) {
            setMensajeError('Error al registrar el usuario. Intente de nuevo.');
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) return;

        axios.get("http://localhost:5000/profile", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => setUser(res.data))
        .catch(err => console.log("Token inválido o expirado"));
    }, []);

    return(
        <header className="site-header">
        <div className="brand">CABA<span className="accent">Crossroads</span></div>
        <nav className="top-controls">
  <div className="user-auth-buttons">
    {user ? (
      <>
        <p className="user-welcome"> Bienvenid@, {user.nombre} {estado}</p>
        <button onClick={()=>setestado("Historial")}> Historial </button>
        <button onClick={()=>setestado("Inicio")}>hoteles</button>
        <button className="auth-btn logout-btn" 
          onClick={() => {
            localStorage.removeItem("token");
            setUser(null);
            setestado("Inicio");
          }}
        >
          Cerrar sesión
        </button>
      </>
    ) : (
      <>
        <button className="auth-btn register-btn" onClick={abrirRegistro}>Registrarse</button>
        <button className="auth-btn login-btn" onClick={abrirSesion}>Iniciar sesión</button>
      </>
    )}
  </div>
</nav>
        

        <div id="RegistroTargeta" ref={AreaRegistro}>
            <div className="Targeta">
                <div id="TituloForm">
                    <h2>Crear cuenta</h2>
                    <span className="BotonCerrar" id="RegistroBotonCerrar" onClick={() =>cerrarRegistro()}>x</span>
                </div>
                <form id="RegistroForm" onSubmit={handleRegister}>
                <div>
                            <label htmlFor="nombre">Nombre: </label>
                            <input type="text" id="nombre" name="nombre" required placeholder="Nombre completo" />
                        </div>
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
                        <div>
                            <label htmlFor="telefono">Teléfono: </label>
                            <input type="tel" id="telefono" name="telefono" required placeholder="Teléfono" />
                        </div>
                        <div>
                            <label htmlFor="documento">Documento: </label>
                            <input type="text" id="documento" name="documento" required placeholder="Número de documento" />
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
                <form id="SesionForm" onSubmit={handleLogin}>
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