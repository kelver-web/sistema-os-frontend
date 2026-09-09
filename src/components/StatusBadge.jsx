const statusConfig = {
  PENDING: { label: 'Pendente', className: 'bg-gray-200 text-gray-800' },
  AWAITING_PARTS: { label: 'Aguardando peça', className: 'bg-amber-100 text-amber-800' },
  IN_PROGRESS: { label: 'Em andamento', className: 'bg-blue-100 text-blue-800' },
  AWAITING_APPROVAL: { label: 'Aguardando aprovação', className: 'bg-purple-100 text-purple-800' },
  COMPLETED: { label: 'Concluído', className: 'bg-teal-100 text-teal-800' },
  DELIVERED: { label: 'Entregue', className: 'bg-green-100 text-green-800' },
  CANCELED: { label: 'Cancelado', className: 'bg-red-100 text-red-800' },
}


function StatusBadge({ status }) {
  const config = statusConfig[status] ?? { label: status, className: 'bg-gray-100 text-gray-600' }

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  )
}

export default StatusBadge
