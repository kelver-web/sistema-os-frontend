import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import DataTable from '../components/DataTable'
import LoadingSpinner from '../components/LoadingSpinner'
import ConfirmDialog from '../components/ConfirmDialog'
import { fetchClients, deleteClient } from '../services/clientsService'
import { useNotification } from '../context/NotificationContext'


function ClientListPage() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [clienteParaExcluir, setClienteParaExcluir] = useState(null)
  const [excluindo, setExcluindo] = useState(false)
  const navigate = useNavigate()
  const excluindoRef = useRef(false)
  const { addNotification } = useNotification()

  async function carregarClientes() {
    setLoading(true)
    try {
      const dados = await fetchClients()
      setClients(dados)
    } catch {
      addNotification('Não foi possível carregar os clientes.', 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    carregarClientes()
  }, [])

  async function handleConfirmarExclusao() {
    if (excluindoRef.current) return
    excluindoRef.current = true
    setExcluindo(true)

    try {
      await deleteClient(clienteParaExcluir.id)
      addNotification('Cliente excluído com sucesso!', 'success')
      setClienteParaExcluir(null)
      carregarClientes()
    } catch (err) {
      if (err.response?.status === 403) {
        addNotification('Você não tem permissão para excluir clientes.', 'error')
      } else {
        addNotification('Não foi possível excluir o cliente.', 'error')
      }
      setClienteParaExcluir(null)
    } finally {
      excluindoRef.current = false
      setExcluindo(false)
    }
  }

  const columns = [
    {
      key: 'name',
      header: 'Cliente',
      render: (row) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-semibold shrink-0">
            {row.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-slate-800">{row.name}</p>
            <p className="text-xs text-slate-400">{row.email}</p>
          </div>
        </div>
      ),
    },
    { key: 'phone', header: 'Telefone' },
    {
      key: 'document',
      header: 'Documento',
      render: (row) => row.document || <span className="text-slate-300">—</span>,
    },
    {
      key: 'actions',
      header: '',
      render: (row) => (
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => navigate(`/clients/${row.id}/edit`)}
            className="text-sm text-indigo-600 hover:underline"
          >
            Editar
          </button>
          <button
            onClick={() => setClienteParaExcluir(row)}
            className="text-sm text-red-600 hover:underline"
          >
            Excluir
          </button>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Clientes</h1>
            <p className="text-sm text-slate-500 mt-1">
              {loading ? 'Carregando...' : `${clients.length} cliente${clients.length !== 1 ? 's' : ''} cadastrado${clients.length !== 1 ? 's' : ''}`}
            </p>
          </div>
          <button
            onClick={() => navigate('/clients/new')}
            className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            + Novo cliente
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          {loading ? (
            <LoadingSpinner label="Carregando clientes..." />
          ) : (
            <DataTable columns={columns} data={clients} pageSize={8} />
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={Boolean(clienteParaExcluir)}
        onClose={() => setClienteParaExcluir(null)}
        onConfirm={handleConfirmarExclusao}
        title="Excluir cliente?"
        loading={excluindo}
        message={`Tem certeza que deseja excluir "${clienteParaExcluir?.name}"? Esta ação não pode ser desfeita.`}
      />
    </div>
  )
}

export default ClientListPage
