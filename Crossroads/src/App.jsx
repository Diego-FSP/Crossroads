import { useEffect, useState } from 'react';
import './App.css'
import {Barra} from './Complementos/siteHeader.jsx'
import {Main} from './Complementos/Main.jsx'
import {HotelCard} from './Complementos/HotelCard.jsx'
import { Raton } from './Complementos/raton.jsx';
import {Registro} from './Complementos/Registro.jsx'
//import {Metodos} from './Metodos.jsx'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Barra />
      <Main></Main>
      <HotelCard></HotelCard>
    </>
  )
}

export default App
