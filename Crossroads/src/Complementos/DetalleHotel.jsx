import { useEffect, useState } from 'react';

export function DetalleHotel({ID}){
    const API_BASE = 'http://localhost:5000/api';

    const [tipoHab, setTipoHab] = useState([]);

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

    return(
        <div>
            <div>Hay {tipoHab.length} disponibles</div>
            {tipoHab.lenght === 0 ? (<p>no hay nada disponible</p>):
            (
                tipoHab.map((t)=>(
                    <div className="THabitacion">
                        <h2>habitacion: {t.nombre}</h2>
                        <p>descripcion: {t.descripcion}</p>
                    </div>
                ))
            )}
        </div>
    )
}