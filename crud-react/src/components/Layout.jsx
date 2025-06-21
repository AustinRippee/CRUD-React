import { Outlet, Link } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      <header className="bg-white shadow-md">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between">
          <Link
            to="/"
            className="text-4xl font-extrabold text-indigo-600 hover:text-indigo-700 transition"
          >
            Message CRUD App
          </Link>
        </div>
      </header>

      <main className="flex-grow max-w-4xl mx-auto px-6 py-10">
        <Outlet />
      </main>

      <footer className="bg-white text-center py-4 text-sm text-gray-500 border-t">
        © 2025 Your Name. All rights reserved.
      </footer>
    </div>
  );
}