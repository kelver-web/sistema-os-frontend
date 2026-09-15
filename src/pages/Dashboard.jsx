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
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
     
    </div>
  )
}
