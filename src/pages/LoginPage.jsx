import { useState } from "react";
import { Link } from "react-router-dom";


function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

        if (!username.trim() || !password.trim()) {
            setError('Por favor, preencha todos os campos corretamente.');
            return;
        }

        setError('');

        console.log(`Login com: ${username} e ${password}`);
        // TODO: chamar api.post('/auth/login/', ...) em outro card

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
                    <label className="block text-sm font-medium mb-1">Usuário</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Senha</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Entrar
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
