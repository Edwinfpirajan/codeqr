import { configureStore } from '@reduxjs/toolkit';
import qrReducer from './qrSlicer/qr.slice';
export const store = configureStore({
  reducer: {
    qr: qrReducer,
  },
});