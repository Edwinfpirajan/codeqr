import React, { useState } from 'react'
import axios from 'axios'

export const CodeDownload = () => {
  const [pin, setPin] = useState('');

  const handleDownload = async () => {
    if (pin.length !== 4) {
      alert("Por favor ingresa un pin de 4 dígitos");
      return;
    }
    try {
      const result = await axios.post(`https://qr-system-production.up.railway.app/api/qr-code/download/${pin}`)
      const serial = result.data.serial;
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'qr.png');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='body'>
      <aside class="profile-card flex" >
        <header>
          <div class="form__group field">
            <input type="text" className="form__field" id="pin" maxLength="4" onChange={e => setPin(e.target.value)} />
            <label for="name" className="form__label">PIN</label>
            <button className='btn' onClick={handleDownload}>DESCARGAR</button>
          </div>
        </header>
      </aside>
    </div>
  )
}

export default CodeDownload