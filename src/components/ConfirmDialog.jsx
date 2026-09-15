import Modal from './Modal'

function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, loading = false }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <p className="text-gray-600 mb-6">{message}</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          disabled={loading}
          className="px-4 py-2 border rounded hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          {loading ? 'Excluindo...' : 'Confirmar'}
        </button>
      </div>
    </Modal>
  )
}

export default ConfirmDialog
