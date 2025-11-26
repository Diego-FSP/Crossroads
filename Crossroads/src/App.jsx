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
  const server = 'http://localhost:3000';
  return (
    <>
      <Barra estado={Estado} setestado={setEstado} server={server}/>
      {Estado=="Inicio"? (<Main server={server}></Main>):(<div></div>)}
      {Estado=="Historial"? (<Historial server={server}></Historial>):(<div></div>)}
    </>
  )
}

export default App
