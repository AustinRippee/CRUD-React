import { Link } from 'react-router-dom';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-white via-indigo-50 to-white text-gray-800 font-sans">
      <header className="p-6 bg-white shadow sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-indigo-600">MessageBoard</h1>
          <nav className="space-x-4 text-sm text-indigo-500 font-medium">
            <Link to="/" className="hover:underline">Home</Link>
            <Link to="/create" className="hover:underline">Create</Link>
          </nav>
        </div>
      </header>
      <main className="max-w-5xl mx-auto w-full px-6 py-10">{children}</main>
    </div>
  );
}