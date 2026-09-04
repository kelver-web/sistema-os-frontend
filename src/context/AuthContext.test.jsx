// src/context/AuthContext.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, waitFor } from '@testing-library/react'
import { AuthProvider, useAuth } from './AuthContext'
import api from '../services/api'

vi.mock('../services/api')

function ExpoeUser() {
  const { user, loading } = useAuth()
  return <div data-testid="status">{loading ? 'carregando' : user ? 'logado' : 'deslogado'}</div>
}

describe('AuthContext — token inválido', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('limpa o localStorage e desloga quando o token salvo é inválido', async () => {
    localStorage.setItem('access_token', 'token-forjado')
    localStorage.setItem('refresh_token', 'refresh-forjado')
    api.get.mockRejectedValueOnce({ response: { status: 401 } })

    const { getByTestId } = render(
      <AuthProvider>
        <ExpoeUser />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(getByTestId('status')).toHaveTextContent('deslogado')
    })

    expect(localStorage.getItem('access_token')).toBeNull()
    expect(localStorage.getItem('refresh_token')).toBeNull()
  })

  it('não chama a API quando não há token salvo', async () => {
    render(
      <AuthProvider>
        <ExpoeUser />
      </AuthProvider>
    )

    await waitFor(() => {
      expect(api.get).not.toHaveBeenCalled()
    })
  })
})
