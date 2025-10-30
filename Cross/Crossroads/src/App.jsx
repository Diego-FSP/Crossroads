import { useState } from 'react'
import './App.css'
import {Barra} from './Complementos/siteHeader.jsx'
import {Main} from './Complementos/Main.jsx'
import {HotelCard} from './Complementos/HotelCard.jsx'
import {Registro} from './Complementos/Registro.jsx'
//import {Metodos} from './Metodos.jsx'
import {loadSectors} from './Metodos.jsx'
import {loadHotels} from './Metodos.jsx'


function App() {
  const [count, setCount] = useState(0)
  loadSectors();
  loadHotels();

  return (
    <>
      <Barra />
      <Main></Main>
      <HotelCard></HotelCard>
      
    </>
  )
}

export default App
