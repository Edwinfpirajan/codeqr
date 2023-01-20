import React from 'react'
import styled from 'styled-components'
import example from '../../img/example.jpg'
import './style.css'

export const CodeValidate = () => {
  return (
    <div className='body'>
      <aside class="profile-card" >
        <header>
          <h1>
            Reclame su código qr, ingresando un pin
            {/* <img src={example} style={{width: "100px"}}/> */}
          </h1>

          <input placeholder='Escriba su pin'/>
          <button>Generar qr</button>
          

        </header> 
      </aside>
    </div>
  )
}

export default CodeValidate
