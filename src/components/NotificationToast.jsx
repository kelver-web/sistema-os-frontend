import { useNotification } from '../context/NotificationContext';

const estilosPorTipo = {
  info: 'bg-blue-600',
  success: 'bg-green-600',
  error: 'bg-red-600',
}

function NotificationToast() {
    const { notifications, dismissNotification } = useNotification();

    return (
    <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`${estilosPorTipo[notification.type] || estilosPorTipo.info} text-white px-4 py-3 rounded shadow-lg flex items-center justify-between gap-4 min-w-[250px]`}
        >
          <span>{notification.message}</span>
          <button
            onClick={() => dismissNotification(notification.id)}
            className="font-bold hover:opacity-75"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}

export default NotificationToast
