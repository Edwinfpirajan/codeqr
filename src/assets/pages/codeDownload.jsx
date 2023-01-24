import './style.css'
import {useParams} from "react-router-dom";
import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import {useSelector, useDispatch} from "react-redux";
import {clear, selectQr, downloadQrAcion} from "../../store/qrSlicer/qr.slice.js";
import ClipLoader from "react-spinners/ClipLoader";
import {SuccessIcon, ErrorIcon} from "../utils_components/icons.jsx";

const CodeDownload = () => {
  const [pin, setPin] = useState('');
  let {serial} = useParams();
  const dispatch = useDispatch()
  const {loading, status, message} = useSelector(selectQr)
  const [error, setError] = useState("")

  const handleDownload = async () => {
    if (pin.length < 4 || pin === "") {
      setError("el campo no puede estar vacio")
      return
    }
    dispatch(downloadQrAcion({serial, pin}))
  };

  const handleOnChange = (e) => {
    const {value} = e.target
    if (value > 9999) {
      this.value = value;
      return
    }
    setPin(value)
    setError("")
  }
  const handleRestart = () => {
    dispatch(clear())
    setPin('')
    setError('')
  }

  return (
    <div className=''>
      <aside className="profile-card flex">
        <header>
          <div className="form__group field">
            {!loading && (
              status === 'Success' ? (
                <>
                  <SuccessIcon/>
                  <label className="text-success">{message}</label>
                </>) : status === 'Error' ? (
                <>
                  <div>
                    <ErrorIcon/>
                    <label className="text-error">{message}</label>
                  </div>
                  {message === 'the pin does not match the qr-code' &&
                    <button className='btn' onClick={handleRestart}>Intentar Nuevamente</button>}
                </>
              ) : (
                <>
                  <div>
                    <label className={`${error ? 'mini-text-top-err':'mini-text-top'}`}>Asigna un Pin de 4 digitos a tu codigo qr</label>
                  </div>
                  <TextField
                    error={error}
                    type="number"
                    sx={{input: {color: 'white'},label:{color:'#1976d2'}}}
                    id="pin"
                    label="PIN QR CODE"
                    helperText={`${error && 'Campo Obligatorio'}`}
                    variant="standard"
                    onChange={handleOnChange}
                    value={pin}
                    color='primary'
                    inputProps={{maxLength: 4}}
                    className={"form__field text-field"}

                  />
                  <button className='btn' onClick={handleDownload}>Descargar QR</button>
                  <div>
                    <label className="mini-text-button">Recuerda solo puedes descargar tu QR una sola vez.</label>
                  </div>
                </>)
            )
            }
            <ClipLoader
              color={"#ffffff"}
              loading={loading}
              size={150}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </header>
      </aside>
    </div>
  )
}

export default CodeDownload