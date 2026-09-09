function FormField({ id, label, type = 'text', value, onChange, error }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full border rounded px-3 py-2 ${error ? 'border-red-500' : 'border-gray-300'}`}
      />
      {error && (
        <p className="text-red-600 text-xs mt-1">{error}</p>
      )}
    </div>
  )
}

export default FormField
