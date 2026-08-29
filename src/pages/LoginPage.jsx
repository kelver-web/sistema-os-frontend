import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";


function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            setError('Por favor, preencha todos os campos corretamente.');
            return;
        }

        setError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/login/', {
                username,
                password
            })
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            console.log('Login realizado com sucesso!');
            // TODO: navegar para área autenticada quando AuthContext existir
        }
        catch (error) {
            if (error.response?.status === 401) {
                setError('Usuário ou senha incorretos.');
            } else {
                setError('Não foi possível conectar ao servidor, Tente novamente.');
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

                {error && (
                    <p className="text-red-600 text-sm mb-4">{error}</p>
                )}

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
