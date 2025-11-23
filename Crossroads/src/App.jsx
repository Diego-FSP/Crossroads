import { useEffect, useState } from 'react';
import './App.css'
import {Barra} from './Complementos/siteHeader.jsx'
import {Main} from './Complementos/Main.jsx'
import { Raton } from './Complementos/raton.jsx';
import { Historial } from './Complementos/HIstorial.jsx';
//import {Metodos} from './Metodos.jsx'


function App() {
  const [count, setCount] = useState(0)
  const [Estado, setEstado] = useState("Inicio")

  return (
    <>
      <Barra estado={Estado} setestado={setEstado}/>
      {Estado=="Inicio"? (<Main></Main>):(<div></div>)}
      {Estado=="Historial"? (<Historial></Historial>):(<div></div>)}
    </>
  )
}

export default App
