import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateMessage() {
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!message.trim()) return alert('Please enter a message');

    try {
      const res = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      if (!res.ok) throw new Error('Failed to create message');
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
      <h2 className="text-3xl font-extrabold text-gray-900">Create New Message</h2>
      <input
        type="text"
        className="w-full border border-gray-300 rounded-lg p-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:border-indigo-600 shadow-sm transition duration-300 ease-in-out"
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white font-semibold rounded-lg px-6 py-3 shadow-md hover:bg-indigo-700 hover:shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-indigo-300"
      >
        Submit
      </button>
    </form>
  );
}