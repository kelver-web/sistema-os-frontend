// src/context/AuthContext.jsx
import { createContext, useContext, useReducer, useEffect } from 'react'
import api from '../services/api'
import { authReducer, initialState } from './authReducer'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  async function hidratarSessao() {
    const token = localStorage.getItem('access_token')

    if (!token) {
      dispatch({ type: 'LOGOUT' })
      return
    }

    try {
      const response = await api.get('/auth/me/')
      dispatch({ type: 'SET_USER', payload: response.data })
    } catch {
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      dispatch({ type: 'LOGOUT' })
    }
  }

  useEffect(() => {
    hidratarSessao()
  }, [])

  async function login (username, password) {
    const response = await api.post('/auth/login/', {
      username,
      password
    })
    localStorage.setItem('access_token', response.data.access)
    localStorage.setItem('refresh_token', response.data.refresh)
    const meResponse = await api.get('/auth/me/')
    dispatch({ type: 'LOGIN', payload: meResponse.data })
  }

  function logout() {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    dispatch({ type: 'LOGOUT' })
  }

    console.log('Estado atual do usuário:', state.user)
  return (
    <AuthContext.Provider value={{ user: state.user, loading: state.loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
