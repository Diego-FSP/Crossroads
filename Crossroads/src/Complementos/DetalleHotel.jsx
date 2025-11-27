import { useEffect, useState } from 'react';

export function DetalleHotel({ID, server}){
    const [Comentarios, setComentaios] = useState([]);
    const [tipoHab, setTipoHab] = useState([]);
    const [Hotel, setHotel] = useState([]);

    useEffect(() =>{
        async function loadTipoH() {
            try{
                const param = new URLSearchParams({id: ID});
                const res = await fetch(`${server}/api/HotelTipoH?${param}`);
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
                const res = await fetch(`${server}/api/hotelD?${param}`);
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
                            <div className='DatosHotelTarjeta'>
                            <h1>{h.nombre}</h1> 
                            <p>{'⭐️'.repeat(h.estrellas)}</p>
                            </div>
                        </div>
                        <div id='AreaHD'>
                            <div id='IMGDA'>
                                <img id='IMGD' src={h.imagen || 'https://via.placeholder.com/400x300?text=Sin+imagen'} alt=""/>
                            </div>
                            <div id='InfoDH'>
                                <div className='Conjunto'>
                                    <div>
                                        <p><strong>Descripcion: </strong>{h.descripcion}</p>
                                        <p><strong>Direccion:</strong> {h.direccion}</p>
                                        <p><strong>Categoria:</strong> {h.categoria}</p>
                                        <span> <strong>Desde: {h.precio}$</strong> </span>
                                    </div>
                                    <div>
                                        <iframe id='MapaD' src={"https://www.google.com/maps/embed?"+h.mapa} frameborder="0" referrerpolicy="no-referrer-when-downgrade"loading="lazy"></iframe>
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
                        <div className='Comentarios'></div>
                        <div className="BotonesReserva">
                                <button class="BtnReservar">Reservar ahora</button>
                                <button class="BtnConsultar">Consultar disponibilidad</button>
                            </div>
                    </div>
                    
                ))
            )}
            
        </div>
    )
}