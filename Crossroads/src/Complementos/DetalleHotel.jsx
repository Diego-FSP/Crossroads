import { useEffect, useState } from 'react';

export function DetalleHotel({ID}){
    const API_BASE = 'http://localhost:5000/api';

    const [tipoHab, setTipoHab] = useState([]);
    const [Hotel, setHotel] = useState([]);

    useEffect(() =>{
        async function loadTipoH() {
            try{
                const param = new URLSearchParams({id: ID});
                const res = await fetch(`${API_BASE}/HotelTipoH?${param}`);
                const data = await res.json();
                console.log(data);
                setTipoHab(data || []);
                console.log(tipoHab)
            }catch{
                console.error('Error al cargar Tipo de habitaciones:', err);
                setTipoHab([]);
            }
        }

        loadTipoH();
    }, [ID]
    );

    useEffect(() =>{
        async function loadHotel() {
            try{
                const param = new URLSearchParams({id: ID});
                const res = await fetch(`${API_BASE}/hotelD?${param}`);
                const data = await res.json();
                console.log(data);
                setHotel(data || []);
                console.log(Hotel);
            }catch{
                console.error('Error al cargar Hotel', err);
                setHotel([]);
            }
        }

        loadHotel();
    }, [ID]);

    return(
        <div>
            {Hotel.length ==0 ? (<p>no se encontro el hotel</p>):
            (
                Hotel.map((h)=>(
                    <div>
                        <div>
                            <h1>{h.nombre}</h1>
                        </div>
                        <div>
                            <div className="rating">{'⭐️'.repeat(h.estrellas)}</div>
                            <p><strong>Descripcion: </strong>{h.descripcion}</p>
                            <p><strong>Direccion:</strong> {h.direccion}</p>
                            <span className="price">
                                <strong>Desde: {h.precio}$</strong>
                            </span>
                        </div>
                    </div>
                ))
            )}
            
            {tipoHab.lenght == 0 ? (<p>no hay nada disponible</p>):
            (
                tipoHab.map((t)=>(
                    <div className="THabitacion">
                        <h2>Habitacion: {t.nombre}</h2>
                        <p><strong>Descripcion:</strong> {t.descripcion}</p>
                        <p><strong>Apto para:</strong> {t.cantidadPersonas} Personas</p>
                        <p><strong>Disponible:</strong> {t.CantidadHabitaciones} Habitaciones</p>
                        <p><strong>Espacio:</strong> {t.metrosCuadrados} m<sup>2</sup></p>
                    </div>
                ))
            )}
        </div>
    )
}