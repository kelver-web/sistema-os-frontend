// src/components/Layout.jsx
import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNotification } from '../context/NotificationContext'

import { FaUser } from "react-icons/fa";
import { GrTechnology } from "react-icons/gr";
import { IoIosLogOut } from "react-icons/io";


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
  const [menuAberto, setMenuAberto] = useState(false)

  const itemsVisiveis = navItems.filter((item) => item.roles.includes(user?.role))

  function handleLogout() {
    logout()
    addNotification('Você saiu da sua conta.', 'info')
    navigate('/login')
  }

  function handleNavClick() {
    setMenuAberto(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Overlay escuro atrás do menu, só em mobile, só quando aberto */}
      {menuAberto && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={() => setMenuAberto(false)}
        />
      )}

      <aside
        className={`fixed md:static inset-y-0 left-0 z-40 w-60 bg-white border-r border-slate-200 flex flex-col shrink-0 transition-transform duration-200 ${menuAberto ? 'translate-x-0' : '-translate-x-full'
          } md:translate-x-0`}
      >
        <div className="px-6 py-5 border-b border-slate-200">
          <h1 className="font-bold text-slate-800">Sistema OS</h1>
        </div>

        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {itemsVisiveis.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={handleNavClick}
              className={({ isActive }) =>
                `px-3 py-2 rounded-lg text-sm font-medium transition-colors ${isActive
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
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shrink-0">
          <button
            onClick={() => setMenuAberto(true)}
            className="md:hidden text-slate-600"
            aria-label="Abrir menu"
          >
            ☰
          </button>

          <div className="hidden md:block" />
          <div className="flex items-center gap-4 md:gap-6">
            {user.username && (
              <div className="flex items-baseline gap-2 text-slate-700 text-sm md:text-base font-medium">
                <div>Bem vindo(a)!</div>
                {user.role === 'tech' && <GrTechnology className="w-4 h-4 text-slate-500" />}
                {user.role === 'admin' && <FaUser className="w-4 h-4 text-slate-500" />}
                <span className="pascal-case">{user.username}</span>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="text-sm font-medium text-red-600 hover:text-red-700 hover:underline transition-colors"
            >
              <IoIosLogOut className="w-5 h-5 inline-block mr-1 cursor-pointer text-slate-600" title="Sair" />
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
