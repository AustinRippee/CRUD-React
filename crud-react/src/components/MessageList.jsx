import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function MessageList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/messages')
      .then(res => res.json())
      .then(setMessages)
      .catch(console.error);
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Messages</h2>
      {messages.length === 0 ? (
        <p className="text-gray-500 italic">No messages found.</p>
      ) : (
        messages.map(({ id, message }) => (
          <div
            key={id}
            className="rounded-lg border border-gray-200 bg-white p-6 shadow transition duration-300 ease-in-out hover:shadow-md hover:-translate-y-1"
          >
            <p className="text-lg font-semibold text-gray-900 mb-3">{message}</p>
            <div className="flex gap-4 text-sm">
              <Link to={`/read/${id}`} className="text-blue-600 hover:underline">
                Read
              </Link>
              <Link to={`/update/${id}`} className="text-yellow-600 hover:underline">
                Update
              </Link>
              <Link to={`/delete/${id}`} className="text-red-600 hover:underline">
                Delete
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
