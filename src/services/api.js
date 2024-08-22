import axios from 'axios'

const apiDevBurger = axios.create({
  baseURL: 'REACT_APP_BACKEND_URL',
  headers: {
    'Content-Type': 'application/json'
  }
})

apiDevBurger.interceptors.request.use(async config => {
  const userData = await localStorage.getItem('devburger:userData')
  const token = userData && JSON.parse(userData).token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default apiDevBurger
