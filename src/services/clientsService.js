import api from './api'

export async function fetchClients() {
  const response = await api.get('/clients/')
  return response.data.results
}
