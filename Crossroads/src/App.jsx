import { useEffect, useState } from 'react';
import './App.css'
import {Barra} from './Complementos/siteHeader.jsx'
import {Main} from './Complementos/Main.jsx'
import {HotelCard} from './Complementos/HotelCard.jsx'
import { Raton } from './Complementos/raton.jsx';
import { DetalleHotel } from './Complementos/DetalleHotel.jsx';
//import {Metodos} from './Metodos.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Barra />
      <Main></Main>
      <HotelCard></HotelCard>
      <DetalleHotel ID={1}></DetalleHotel>
    </>
  )
}

export default App
