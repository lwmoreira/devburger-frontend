import axios from 'axios'

// Configura a URL base da API
const apiDevBurger = axios.create({
  baseURL: 'http://localhost:3001/',
  // baseURL: 'https://devburger-backend-production.up.railway.app/',
  headers: {
    'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
  }
})

// Intercepta as requisições para adicionar o token de autorização
apiDevBurger.interceptors.request.use(async config => {
  const userData = await localStorage.getItem('devburger:userData')
  const token = userData && JSON.parse(userData).token
  if (token) {
    config.headers.Authorization = `Bearer ${token}` // Adiciona o token ao cabeçalho da requisição
  }
  return config
})

export default apiDevBurger
