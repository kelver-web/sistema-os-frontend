import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";


function ProtectedRoute({ children }) {
    const { user, loading } = useAuth()

    if (loading) {
        <div className="min-h-screen flex items-center justify-center">
            <LoadingSpinner label="Verificando sessão..." />
        </div>
    }

    if (!user) {
        return <Navigate to="/login" replace />
    }

    return <Outlet />
}

export default ProtectedRoute
