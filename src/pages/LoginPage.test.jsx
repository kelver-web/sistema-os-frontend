// src/pages/LoginPage.test.jsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import LoginPage from './LoginPage'

function renderComPrevisao() {
  return render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>
  )
}

describe('LoginPage', () => {
  it('não permite submeter o form vazio', async () => {
    const user = userEvent.setup()
    renderComPrevisao()

    const botao = screen.getByRole('button', { name: /entrar/i })
    await user.click(botao)

    expect(screen.getByText(/preencha todos os campos corretamente./i)).toBeInTheDocument()
  })

  it('não mostra erro se os campos forem preenchidos', async () => {
    const user = userEvent.setup()
    renderComPrevisao()

    await user.type(screen.getByLabelText(/usuário/i), 'joao')
    await user.type(screen.getByLabelText(/senha/i), 'senha123')
    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(screen.queryByText(/preencha usuário e senha/i)).not.toBeInTheDocument()
  })

  it('não permite submeter com apenas espaços em branco', async () => {
    const user = userEvent.setup()
    renderComPrevisao()

    await user.type(screen.getByLabelText(/usuário/i), '   ')
    await user.type(screen.getByLabelText(/senha/i), '   ')
    await user.click(screen.getByRole('button', { name: /entrar/i }))

    expect(screen.getByText(/preencha todos os campos corretamente./i)).toBeInTheDocument()
  })

  it('exibe link para a página de registro', () => {
    renderComPrevisao()
    expect(screen.getByRole('link', { name: /cadastre-se/i })).toBeInTheDocument()
  })
})