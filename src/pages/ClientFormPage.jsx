// src/pages/ClientFormPage.jsx
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FormField from '../components/FormField'
import LoadingSpinner from '../components/LoadingSpinner'
import { fetchClient, createClient, updateClient } from '../services/clientsService'
import { useNotification } from '../context/NotificationContext'

const camposIniciais = {
  name: '',
  email: '',
  phone: '',
  document: '',
  address: '',
  notes: '',
}

function ClientFormPage() {
  const { id } = useParams()
  const isEditMode = Boolean(id)
  const navigate = useNavigate()
  const { addNotification } = useNotification()

  const [form, setForm] = useState(camposIniciais)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(isEditMode)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!isEditMode) return

    async function carregarCliente() {
      try {
        const dados = await fetchClient(id)
        setForm({
          name: dados.name,
          email: dados.email,
          phone: dados.phone,
          document: dados.document || '',
          address: dados.address || '',
          notes: dados.notes || '',
        })
      } catch {
        addNotification('Não foi possível carregar os dados do cliente.', 'error')
        navigate('/clients')
      } finally {
        setLoading(false)
      }
    }

    carregarCliente()
  }, [id, isEditMode])

  function handleChange(campo) {
    return (e) => setForm((prev) => ({ ...prev, [campo]: e.target.value }))
  }

  function extrairErros(dadosErro) {
    const novosErros = {}
    for (const campo in dadosErro) {
      novosErros[campo] = Array.isArray(dadosErro[campo]) ? dadosErro[campo][0] : dadosErro[campo]
    }
    return novosErros
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setErrors({})
    setSaving(true)

    try {
      if (isEditMode) {
        await updateClient(id, form)
        addNotification('Cliente atualizado com sucesso!', 'success')
      } else {
        await createClient(form)
        addNotification('Cliente criado com sucesso!', 'success')
      }
      navigate('/clients')
    } catch (err) {
      if (err.response?.status === 400) {
        setErrors(extrairErros(err.response.data))
        addNotification('Corrija os campos destacados.', 'error')
      } else if (!err.response) {
        addNotification('Não foi possível conectar ao servidor. Tente novamente.', 'error')
      } else {
        addNotification('Não foi possível salvar o cliente.', 'error')
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <LoadingSpinner label="Carregando cliente..." />
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-slate-800 mb-6">
          {isEditMode ? 'Editar cliente' : 'Novo cliente'}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
        >
          <FormField
            id="name"
            label="Nome"
            value={form.name}
            onChange={handleChange('name')}
            error={errors.name}
          />
          <FormField
            id="email"
            label="E-mail"
            type="email"
            value={form.email}
            onChange={handleChange('email')}
            error={errors.email}
          />
          <FormField
            id="phone"
            label="Telefone"
            value={form.phone}
            onChange={handleChange('phone')}
            error={errors.phone}
          />
          <FormField
            id="document"
            label="Documento (CPF/CNPJ)"
            value={form.document}
            onChange={handleChange('document')}
            error={errors.document}
          />
          <FormField
            id="address"
            label="Endereço"
            value={form.address}
            onChange={handleChange('address')}
            error={errors.address}
          />
          <FormField
            id="notes"
            label="Notas"
            value={form.notes}
            onChange={handleChange('notes')}
            error={errors.notes}
          />

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => navigate('/clients')}
              className="px-4 py-2 border rounded hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-indigo-300"
            >
              {saving ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ClientFormPage
