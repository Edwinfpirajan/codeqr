import React, {useEffect, /*useState*/} from 'react'
// import TextField from '@mui/material/TextField';
import './style.css'
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {clear, selectQr, validateQrAction} from "../../store/qrSlicer/qr.slice.js";
import ClipLoader from "react-spinners/ClipLoader";
import {SuccessIcon, ErrorIcon} from "../utils_components/icons.jsx";

export const CodeValidate = () => {
  // const [pin, setPin] = useState('')
  const {serial} = useParams()
  const dispatch = useDispatch()
  const {loading, status, message} = useSelector(selectQr)
  // const [error, setError] = useState("")
  // const handleValidate = async () => {
  //   if (pin.length < 4 || pin === "") {
  //     setError("el campo no puede estar vacio")
  //     return
  //   }
  //   dispatch(validateQrAction({serial, pin}))
  // }
  // const handleOnChange = (e) => {
  //   const {value} = e.target
  //   if (value > 9999) {
  //     this.value = value;
  //     return
  //   }
  //   setPin(value)
  //   setError("")
  // }
  const handleRestart = () => {
    dispatch(clear())
    setPin('')
    setError('')
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch(validateQrAction({serial}))
    }, 3000)
  }, [])

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
                  <ClipLoader
                    color={"#ffffff"}
                    loading={true}
                    size={150}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </>)
            )
            }
          </div>
        </header>
      </aside>
    </div>
  )
}

export default CodeValidate
