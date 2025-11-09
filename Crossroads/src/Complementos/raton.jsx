import React, { useState, useEffect } from "react";

export function Raton(){
        const [px, setpx] = useState([]);
        const [py, setpy] = useState([]);

        useEffect(()=>{    
            document.addEventListener("mousemove",(evt) =>{
                setpx(evt.x-150)
                setpy(evt.y + window.scrollY-150)
            })
        })

    return(
        <div>
            <div id="puntero" style={{
                position: "absolute",
                top: py,
                left: px,
            }}></div>
    
        </div>
    )
}