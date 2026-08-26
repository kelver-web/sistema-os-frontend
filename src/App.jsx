import './App.css'
import { useEffect } from 'react';

import api from './services/api';


function App() {

  useEffect(() => {
    api.get('/clients/')
    .then(r => {
      r.console.log('Sucesso: ', r.data)
    })
    .catch(e => {
      console.log('Erro: ', e.response?.data)
    })
  }, [])

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-600">Sistema OS</h1>
    </>
  )
}

export default App
