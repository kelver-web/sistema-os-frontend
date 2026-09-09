import { useState } from 'react'
import FormField from '../components/FormField'
import Modal from '../components/Modal'
import ConfirmDialog from '../components/ConfirmDialog'

import DataTable from "../components/DataTable";

import StatusBadge from '../components/StatusBadge'
import PriorityBadge from '../components/PriorityBadge'

const todosStatus = ['PENDING', 'AWAITING_PARTS', 'IN_PROGRESS', 'AWAITING_APPROVAL', 'COMPLETED', 'DELIVERED', 'CANCELED']
const todasPrioridades = [1, 2, 3, 4]



const dadosFicticios = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  nome: `Item ${i + 1}`,
  categoria: i % 2 === 0 ? 'A' : 'B',
}))

const colunasFicticias = [
  { key: 'nome', header: 'Nome' },
  { key: 'categoria', header: 'Categoria' },
]

export default function Dashboard() {
  return (
    <div className="p-4">
      <DataTable columns={colunasFicticias} data={dadosFicticios} />
      <TesteBadges />
      <TesteComponentes />
    </div>
  )
}


function TesteComponentes() {
  const [nome, setNome] = useState('')
  const [modalAberto, setModalAberto] = useState(false)
  const [confirmAberto, setConfirmAberto] = useState(false)

  return (
    <div className="p-8 flex flex-col gap-4">
      <FormField
        id="teste-nome"
        label="Nome de teste"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        error={nome.length > 0 && nome.length < 3 ? 'Nome muito curto' : ''}
      />

      <button onClick={() => setModalAberto(true)} className="bg-blue-600 text-white px-4 py-2 rounded">
        Abrir Modal
      </button>

      <button onClick={() => setConfirmAberto(true)} className="bg-red-600 text-white px-4 py-2 rounded">
        Testar ConfirmDialog
      </button>

      <Modal isOpen={modalAberto} onClose={() => setModalAberto(false)} title="Modal de teste">
        <p>Qualquer conteúdo pode entrar aqui.</p>
      </Modal>

      <ConfirmDialog
        isOpen={confirmAberto}
        onClose={() => setConfirmAberto(false)}
        onConfirm={() => {
          alert('Confirmado!')
          setConfirmAberto(false)
        }}
        title="Excluir registro?"
        message="Esta ação não pode ser desfeita."
      />
    </div>
  )
}


function TesteBadges() {
  return (
    <div className="p-8 flex flex-col gap-4">
      <div className="flex gap-2 flex-wrap">
        {todosStatus.map((s) => <StatusBadge key={s} status={s} />)}
      </div>
      <div className="flex gap-2 flex-wrap">
        {todasPrioridades.map((p) => <PriorityBadge key={p} priority={p} />)}
      </div>
    </div>
  )
}