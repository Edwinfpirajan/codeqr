import React, {useState} from 'react'
import TextField from '@mui/material/TextField';
import './style.css'
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clear, selectQr, validateQrAction} from "../../store/qrSlicer/qr.slice.js";
import ClipLoader from "react-spinners/ClipLoader";
import {SuccessIcon, ErrorIcon} from "../utils_components/icons.jsx";

export const CodeValidate = () => {
  const [pin, setPin] = useState('')
  const {serial} = useParams()
  const dispatch = useDispatch()
  const {loading, status, message} = useSelector(selectQr)
  const [error, setErr] = useState("")
  const handleValidate = async () => {
    if (pin.length < 4 || pin === "") {
      setErr("el campo no puede estar vacio")
      return
    }
    dispatch(validateQrAction({serial, pin}))
  }
  const handleOnChange = (e) => {
    const {value} = e.target
    if (value > 9999) {
      this.value = value;
      return
    }
    setPin(value)
    setErr("")
  }
  const handleRestart = () => {
    dispatch(clear())
    setPin('')
    setErr('')
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
                  <TextField
                    error={error}
                    type="number"
                    sx={{input: {color: 'white'}}}
                    id="pin"
                    label="PIN QR CODE"
                    helperText="Campo Obligatirio"
                    variant="standard"
                    onChange={handleOnChange}
                    value={pin}
                    color='success'
                    inputProps={{maxLength: 4}}
                    className={"form__field"}
                  />
                  <button className='btn' onClick={handleValidate}>VALIDAR QR</button>
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

export default CodeValidate
