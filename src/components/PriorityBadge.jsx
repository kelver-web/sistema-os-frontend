const priorityConfig = {
  1: { label: 'Baixa', className: 'bg-gray-200 text-gray-700' },
  2: { label: 'Média', className: 'bg-blue-100 text-blue-700' },
  3: { label: 'Alta', className: 'bg-orange-100 text-orange-800' },
  4: { label: 'Urgente', className: 'bg-red-100 text-red-800' },
}

function PriorityBadge({ priority }) {
  const config = priorityConfig[priority] ?? { label: `Prioridade ${priority}`, className: 'bg-gray-100 text-gray-600' }

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  )
}

export default PriorityBadge
