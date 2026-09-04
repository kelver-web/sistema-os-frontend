// src/pages/RegisterPage.test.jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import { NotificationProvider } from '../context/NotificationContext'
import NotificationToast from '../components/NotificationToast'
import RegisterPage from './RegisterPage'

function renderComPrevisao() {
  return render(
    <BrowserRouter>
      <NotificationProvider>
        <NotificationToast />
        <RegisterPage />
      </NotificationProvider>
    </BrowserRouter>
  )
}

describe('RegisterPage', () => {
  it('não permite submeter o form vazio', async () => {
    const user = userEvent.setup()
    renderComPrevisao()

    await user.click(screen.getByRole('button', { name: /cadastrar/i }))

    expect(screen.getByText(/preencha todos os campos/i)).toBeInTheDocument()
  })

  it('não mostra erro se todos os campos forem preenchidos', async () => {
    const user = userEvent.setup()
    renderComPrevisao()

    await user.type(screen.getByLabelText(/usuário/i), 'maria')
    await user.type(screen.getByLabelText(/e-mail/i), 'maria@teste.com')
    await user.type(screen.getByLabelText(/^senha$/i), 'SenhaForte123!')
    await user.type(screen.getByLabelText(/confirmar senha/i), 'SenhaForte123!')
    await user.click(screen.getByRole('button', { name: /cadastrar/i }))

    expect(screen.queryByText(/preencha todos os campos/i)).not.toBeInTheDocument()
  })

  it('exibe link para a página de login', () => {
    renderComPrevisao()
    expect(screen.getByRole('link', { name: /entrar/i })).toBeInTheDocument()
  })
})
