import { useRef, useState, useEffect } from "react"
import axios from 'axios';
import './Historial.css'
import { DetalleHotel } from "./DetalleHotel";

export function Historial(){
    // valores
    //const [user, setUser] = useState(null);
    const [idH, setIDH] = useState(0);
    const [historial, setHistorial]= useState([]);
    const [Actividad, setActividad]= useState(null);
    let contador =0;

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if (!token) return;

        axios.get("http://localhost:5000/api/HistorialU", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => setHistorial(res.data))
        .catch(err => console.log("Token inválido o expirado"));
    },[])

    return(
        <div id="HistorialArea">
            <div id="Titulo">
                <h1>Historial</h1>
            </div>
            <div id="ConjuntoH">
                <div id="ListaH">
                        {historial.length == 0? (<p>No hay actividad del usuario</p>) : 
                            (
                                historial.map((h)=>(
//{ (new Date(h.fechaGuardado)).getDate() }
                                    <div className="itemHistorial" onClick={() => setActividad(h)}>
                                        <p>{ (Date(h.fechaGuardado)) } </p>
                                    </div>
                                ))
                            )
                        }
                </div>
                    <div id="Historial">
                        {Actividad == null? (<p>no hay actividad</p>):
                        (
                            <div>
                                <h2>{Actividad.accion}</h2>
                                <p>Realizada en {Date(Actividad.fechaGuardado)}</p>
                                <div>
                                    {Actividad.accion.includes("visito") == true ? (
                                        <DetalleHotel ID={Actividad.idHotel}></DetalleHotel>
                                    ):( <div></div> )}
                                </div>
                            </div>
                        )}
                        
                    </div>
            </div>
        </div>
    )
}