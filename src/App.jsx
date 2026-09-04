import './App.css'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './components/ProtectedRoute'
import { useAuth } from './context/AuthContext'
import NotificationToast from './components/NotificationToast'
import { useNotification } from './context/NotificationContext'


function DashboardPlaceholder() {
  const { addNotification } = useNotification()

  return (
    <div className="p-8">
      <h1 className="text-2xl mb-4">Área autenticada (placeholder)</h1>
      <button
        onClick={() => addNotification('Notificação de teste!', 'success')}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Testar notificação
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
