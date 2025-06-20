export default function Button({ children, color = 'indigo', className = '', ...props }) {
  const baseClasses = 'px-4 py-2 rounded-md font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const colors = {
    indigo: 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200 focus:ring-indigo-500',
    yellow: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 focus:ring-yellow-500',
    red: 'bg-red-100 text-red-700 hover:bg-red-200 focus:ring-red-500',
    indigoSolid: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
  };

  const colorClasses = colors[color] || colors.indigo;

  return (
    <button
      {...props}
      className={`${baseClasses} ${colorClasses} ${className}`}
    >
      {children}
    </button>
  );
}