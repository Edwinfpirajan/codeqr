import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {QrApi} from "../../services/qr-api";
import moment from 'moment';

export const validateQrAction = createAsyncThunk('qr/validate', (data) =>
  QrApi.validate(data));

export const downloadQrAcion = createAsyncThunk('qr/download', (data) =>
  QrApi.download(data))


const initialState = {
  loading: false,
  status: '',
  message: '',
  date: '',
}
export const qrSlice = createSlice({
  name: 'qr',
  initialState: {
    qrState: initialState,
  },
  reducers: {
    clear(state) {
      state.qrState = initialState
    },
  },
  extraReducers: (builder) => {
    builder
      //Validate QR
      .addCase(validateQrAction.pending, (state) => {
        state.qrState.loading = true
      })
      .addCase(validateQrAction.fulfilled, (state, action) => {
        state.qrState.loading = false
        state.qrState.status = action.payload.message
        state.qrState.message = action.payload.data
      })
      //Download QR
      .addCase(downloadQrAcion.pending, (state) => {
        state.qrState.loading = true
      })
      .addCase(downloadQrAcion.fulfilled, (state, action) => {
        if (action.payload.message === 'Success') {
          const url = window.URL.createObjectURL(b64toBlop(action.payload.data), {type: 'image/png'})
          const downloadLink = document.createElement('a');
          downloadLink.href = url;
          downloadLink.setAttribute('download', 'qr.png');
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink)
          state.qrState.loading = false
          state.qrState.status = 'Success'
          return
        }
        state.qrState.loading = false
        state.qrState.status = action.payload.message
        state.qrState.message = action.payload.data
      })
  },
});

const b64toBlop = (b64Data, contentType = 'image/png') => {
  const byteCharacters = atob(b64Data)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray])
}

export const {clear} = qrSlice.actions

export const selectQr = (state) => state.qr.qrState
export default qrSlice.reducer