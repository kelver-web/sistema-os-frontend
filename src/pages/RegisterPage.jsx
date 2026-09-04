// src/pages/RegisterPage.jsx
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'
import { useNotification } from '../context/NotificationContext'

function RegisterPage() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const { addNotification } = useNotification()

  async function handleSubmit(e) {
    e.preventDefault()

    if (!username.trim() || !email.trim() || !password.trim() || !passwordConfirm.trim()) {
      addNotification('Preencha todos os campos.', 'error')
      return
    }

    setLoading(true)

    try {
      await api.post('/auth/register/', {
        username,
        email,
        password,
        password_confirm: passwordConfirm,
      })
      addNotification('Conta criada com sucesso! Faça login para continuar.', 'success')
      navigate('/login')
    } catch (err) {
      const dados = err.response?.data
      if (dados) {
        const primeiraMensagem = Object.values(dados)[0]?.[0]
        addNotification(primeiraMensagem || 'Não foi possível criar a conta.', 'error')
      } else {
        addNotification('Não foi possível conectar ao servidor. Tente novamente.', 'error')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Criar conta</h1>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium mb-1">Usuário</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">E-mail</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium mb-1">Senha</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="passwordConfirm" className="block text-sm font-medium mb-1">Confirmar senha</label>
          <input
            id="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        <p className="text-sm text-center mt-4">
          Já tem conta?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Entrar
          </Link>
        </p>
      </form>
    </div>
  )
}

export default RegisterPage
