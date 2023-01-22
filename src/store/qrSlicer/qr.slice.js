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
        if (action.payload.message !== 'Error') {
          const url = window.URL.createObjectURL(new Blob([action.payload]));
          const downloadLink = document.createElement('a');
          downloadLink.href = url;
          console.log(downloadLink)
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

export const {clear} = qrSlice.actions

export const selectQr = (state) => state.qr.qrState
export default qrSlice.reducer