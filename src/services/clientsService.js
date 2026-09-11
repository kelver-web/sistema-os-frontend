import api from './api'

export async function fetchClients() {
  const response = await api.get('/clients/')
  return response.data.results
}

export async function fetchClient(id) {
  const response = await api.get(`/clients/${id}/`)
  return response.data
}

export async function createClient(data) {
  const response = await api.post('/clients/', data)
  return response.data
}

export async function updateClient(id, data) {
  const response = await api.put(`/clients/${id}/`, data)
  return response.data
}

export async function deleteClient(id) {
  await api.delete(`/clients/${id}/`)
}
