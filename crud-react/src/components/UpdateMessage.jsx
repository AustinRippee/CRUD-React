import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateMessage() {
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

  async function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim()) return alert('Please enter a message');

    try {
      const res = await fetch(`http://localhost:5000/api/messages/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) throw new Error('Failed to update message');
      navigate('/');
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6"
    >
      <h2 className="text-3xl font-extrabold text-gray-900">Update Message</h2>
      <input
        type="text"
        className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:border-yellow-500 shadow-sm transition duration-300 ease-in-out"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="bg-yellow-500 text-white font-semibold rounded-lg px-6 py-3 shadow-md hover:bg-yellow-600 hover:shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-yellow-400"
      >
        Update
      </button>
    </form>
  );
}