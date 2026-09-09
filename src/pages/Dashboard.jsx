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