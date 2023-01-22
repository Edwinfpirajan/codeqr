import axios from "axios";

// axios.defaults.baseURL = "https://qr-system-production.up.railway.app/api/qr-code"
axios.defaults.baseURL = "http://localhost:8080/api/qr-code"
axios.defaults.method = 'post'

export const QrApi = {
  async validate({serial, pin}) {
    try {
      const response = await axios.post(`validate/${serial}`,
        {"pin": pin})
      return response.data
    } catch (e) {
      return e.response.data
    }
  },
  
  async download({serial,pin}){
    try {
      const response = await axios.post(`download/${serial}`,
        {"pin":pin})
      return response.data
    }catch (e) {
      return e.response.data
    }
  },
}