import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function DeleteMessage() {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/messages/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Message not found');
        return res.json();
      })
      .then((data) => setMessage(data.message))
      .catch(() => navigate('/'));
  }, [id, navigate]);

  async function handleDelete() {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      const res = await fetch(`http://localhost:5000/api/messages/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete message');
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6">
      <h2 className="text-3xl font-extrabold text-gray-900">Delete Message</h2>
      <p className="text-lg">{message}</p>
      <div className="flex gap-4">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white font-semibold rounded-lg px-6 py-3 shadow-md hover:bg-red-700 hover:shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-red-300"
        >
          Delete
        </button>
        <button
          onClick={() => navigate('/')}
          className="bg-gray-200 text-gray-700 font-semibold rounded-lg px-6 py-3 shadow-sm hover:bg-gray-300 hover:shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}