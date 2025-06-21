import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function MessageList() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/messages')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch messages');
        return res.json();
      })
      .then((data) => setMessages(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-400 text-lg py-10">Loading messages…</p>
    );
  if (error)
    return (
      <p className="text-center text-red-600 font-semibold py-10">
        Error: {error}
      </p>
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Link
          to="/create"
          className="bg-indigo-600 text-white font-semibold rounded-lg px-6 py-3 shadow-md hover:bg-indigo-700 hover:shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-300"
        >
          + New Message
        </Link>
      </div>

      {messages.length === 0 ? (
        <p className="text-center text-gray-500 italic">No messages found.</p>
      ) : (
        messages.map(({ id, message }) => (
          <div
            key={id}
            className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-lg hover:-translate-y-1"
          >
            <p className="text-lg font-semibold text-gray-900 mb-3">{message}</p>
            <div className="flex gap-6 text-sm font-medium">
              <Link
                to={`/read/${id}`}
                className="text-indigo-600 hover:underline"
              >
                Read
              </Link>
              <Link
                to={`/update/${id}`}
                className="text-yellow-600 hover:underline"
              >
                Update
              </Link>
              <Link
                to={`/delete/${id}`}
                className="text-red-600 hover:underline"
              >
                Delete
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}