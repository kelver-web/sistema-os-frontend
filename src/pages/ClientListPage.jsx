import { useState, useEffect } from 'react'
import DataTable from '../components/DataTable'
import LoadingSpinner from '../components/LoadingSpinner'
import { fetchClients } from '../services/clientsService'
import { useNotification } from '../context/NotificationContext'

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
    key: 'created_at',
    header: 'Cliente desde',
    render: (row) =>
      new Date(row.created_at).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
  },
]

function ClientListPage() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const { addNotification } = useNotification()

  useEffect(() => {
    async function carregarClientes() {
      try {
        const dados = await fetchClients()
        setClients(dados)
      } catch {
        addNotification('Não foi possível carregar os clientes.', 'error')
      } finally {
        setLoading(false)
      }
    }
    carregarClientes()
  }, [])

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
          <button className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
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
    </div>
  )
}

export default ClientListPage
