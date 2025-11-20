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
                setTipoHab(data || []);
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
                setHotel(data || []);
            }catch{
                console.error('Error al cargar Hotel', err);
                setHotel([]);
            }
        }

        loadHotel();
    }, [ID]);

    return(
        <div id='TargetaD'>
            {Hotel.length ==0 ? (<p>no se encontro el hotel</p>):
            (
                Hotel.map((h)=>(
                    <div>
                        <div>
                            <div>
                            <h1>{h.nombre}</h1> 
                            <p>{'⭐️'.repeat(h.estrellas)}</p>
                            </div>
                        </div>
                        <div id='AreaHD'>
                            <div id='IMGDA'>
                                <img
                                    id='IMGD' 
                                    src={h.imagen || 'https://via.placeholder.com/400x300?text=Sin+imagen'} 
                                    alt="" />
                            </div>
                            <div id='InfoDH'>
                                <div className='Conjunto'>
                                    <div>
                                        <p><strong>Descripcion: </strong>{h.descripcion}</p>
                                        <p><strong>Direccion:</strong> {h.direccion}</p>
                                        <p><strong>Categoria:</strong> {h.categoria}</p>
                                        <span >
                                            <strong>Desde: {h.precio}$</strong>
                                        </span>
                                    </div>
                                    <div>
                                        <iframe 
                                        id='MapaD'
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.2804884429565!2d-58.3799827!3d-34.5970682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccacba27001cd%3A0xe0f9b7c16c7447ab!2sEl%20Conquistador%20Hotel!5e0!3m2!1ses!2sar!4v1763647483018!5m2!1ses!2sar"
                                        frameborder="0"
                                        referrerpolicy="no-referrer-when-downgrade"
                                        loading="lazy" >
                                        </iframe>
                                        
                                    </div>
                                </div>
                                <div className='AreaTipoH'>
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
                            </div>
                        </div>
                    </div>
                ))
            )}
            
        </div>
    )
}