import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNotification } from "../context/NotificationContext";


function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const { addNotification } = useNotification();

    async function handleSubmit(e) {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            addNotification('Por favor, preencha todos os campos corretamente.', 'error')
            return;
        }

        setLoading(true);

        try {
            await login(username, password);
            addNotification('Login realizado com sucesso!', 'success')
            navigate('/dashboard');
        }
        catch (err) {
            if (err.response?.status === 401) {
                addNotification('Usuário ou senha incorretos.', 'error')
            } else {
                addNotification('Não foi possível conectar ao servidor. Tente novamente.', 'error')
            }
        }
        finally {
            setLoading(false);
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
            >
                <h1 className="text-2xl font-bold mb-6 text-center">Entrar</h1>

                <div className="mb-4">
                    <label htmlFor="username" className="block text-sm font-medium mb-1">Usuário</label>
                    <input
                        id="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium mb-1">Senha</label>
                    <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    {loading ? 'Entrando...' : 'Entrar'}
                </button>

                <p className="text-sm text-center mt-4">
                    Não tem conta?{' '}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Cadastre-se
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default LoginPage
