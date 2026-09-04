// src/pages/LoginPage.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { NotificationProvider } from '../context/NotificationContext'
import NotificationToast from '../components/NotificationToast'
import LoginPage from './LoginPage'
import api from '../services/api'

vi.mock('../services/api')

function renderComPrevisao() {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider>
          <NotificationToast />
          <LoginPage />
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
  })

  it('não permite submeter o form vazio', async () => {
    const user = userEvent.setup()
    renderComPrevisao()

    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(screen.getByText(/preencha todos os campos corretamente/i)).toBeInTheDocument()
  })

  it('faz login com sucesso e navega', async () => {
    const user = userEvent.setup()
    api.post.mockResolvedValueOnce({
      data: { access: 'access-fake', refresh: 'refresh-fake' },
    })
    api.get.mockResolvedValueOnce({
      data: { id: 1, username: 'joao', role: 'tech' },
    })

    renderComPrevisao()

    await user.type(screen.getByLabelText(/usuário/i), 'joao')
    await user.type(screen.getByLabelText(/senha/i), 'senha123')
    await user.click(screen.getByRole('button', { name: /entrar/i }))

    await waitFor(() => {
      expect(localStorage.getItem('access_token')).toBe('access-fake')
    })
  })

  it('mostra erro claro quando credenciais são inválidas (401)', async () => {
    const user = userEvent.setup()
    api.post.mockRejectedValueOnce({ response: { status: 401 } })
    renderComPrevisao()

    await user.type(screen.getByLabelText(/usuário/i), 'joao')
    await user.type(screen.getByLabelText(/senha/i), 'senhaerrada')
    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(await screen.findByText(/usuário ou senha incorretos/i)).toBeInTheDocument()
  })

  it('exibe link para a página de registro', () => {
    renderComPrevisao()
    expect(screen.getByRole('link', { name: /cadastre-se/i })).toBeInTheDocument()
  })
})
