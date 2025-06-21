import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ReadMessage() {
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

  return (
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6">
      <h2 className="text-3xl font-extrabold text-gray-900">Read Message</h2>
      <p className="text-lg">{message}</p>
      <button
        onClick={() => navigate('/')}
        className="bg-gray-200 text-gray-700 font-semibold rounded-lg px-6 py-3 shadow-sm hover:bg-gray-300 hover:shadow-md transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-gray-300"
      >
        Back to List
      </button>
    </div>
  );
}