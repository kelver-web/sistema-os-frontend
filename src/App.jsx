import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'
import { useNavigate } from 'react-router-dom'
import NotificationToast from './components/NotificationToast'
import { useNotification } from './context/NotificationContext'


function DashboardPlaceholder() {
  const { user, logout } = useAuth()
  const { addNotification } = useNotification()
  const navigate = useNavigate()

  const handleLogout = async () => {
    logout()
    addNotification('Você saiu da sua conta.', 'info')
    navigate('/login')
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Olá, {user?.username} ({user?.role})</h1>
      <button
        onClick={handleLogout}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Sair
      </button>
    </div>
  )
}


function App() {

  return (
    <>
      <NotificationToast />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPlaceholder />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </>
  )
}

export default App
