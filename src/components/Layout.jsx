import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNotification } from '../context/NotificationContext'

const navItems = [
  { to: '/clients', label: 'Clientes', roles: ['admin', 'tech', 'attendant'] },
  { to: '/equipments', label: 'Equipamentos', roles: ['admin', 'tech', 'attendant'] },
  { to: '/service-orders', label: 'Ordens de Serviço', roles: ['admin', 'tech', 'attendant'] },
  { to: '/parts', label: 'Peças', roles: ['admin', 'tech'] },
  { to: '/reports', label: 'Relatórios', roles: ['admin'] },
]

function Layout() {
  const { user, logout } = useAuth()
  const { addNotification } = useNotification()
  const navigate = useNavigate()

  const itemsVisiveis = navItems.filter((item) => item.roles.includes(user?.role))

  function handleLogout() {
    logout()
    addNotification('Você saiu da sua conta.', 'info')
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-60 bg-white border-r border-slate-200 flex flex-col shrink-0">
        <div className="px-6 py-5 border-b border-slate-200">
          <h1 className="font-bold text-slate-800">Sistema OS</h1>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {itemsVisiveis.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div />
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-slate-800">{user?.username}</p>
              <p className="text-xs text-slate-400 capitalize">{user?.role}</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:underline"
            >
              Sair
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
