import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import './style.css'

const CodeDownload = () => {
  let { link } = useParams();
  const [pin, setPin] = useState('');

  const handleDownload = async () => {
    if (pin.length !== 4) {
      alert("Por favor ingresa un pin de 4 dígitos");
      return;
    }
    try {
      const response = await axios.post(
        `https://qr-system-production.up.railway.app/api/qr-code/download/${link}`,
        {
          pin: pin
        },
        {
          responseType: 'blob'
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.setAttribute('download', 'qr.png');
      document.body.appendChild(downloadLink);
      downloadLink.click();
    } catch (error) {
      console.log(error);
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
        alert("Error al generar QR, por favor verifica los datos ingresados o intente de nuevo más tarde");
      } else if (error.request) {
        console.log(error.request);
        alert("Error al conectarse con el servidor, por favor verifica tu conexión a internet o intente de nuevo más tarde");
      } else {
        console.log('Error', error.message);
        alert("Error desconocido, por favor intente de nuevo más tarde");
      }
    }
  };

  return (
    <div className='body'>
      <aside className="profile-card" >
        <header>
          <label>Ingrese el pin:</label>
          <input type="text" id="pin" maxLength="4" onChange={e => setPin(e.target.value)} />
          <button onClick={handleDownload}>Generar qr</button>
        </header>
      </aside>
    </div>
  )
}

export default CodeDownload