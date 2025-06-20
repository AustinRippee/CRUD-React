import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Form.css';

function ReadMessage() {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/messages/${id}`)
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, [id]);

  return (
    <div className="card">
      <h1>Read Message</h1>
      <label>message:</label>
      <input value={message} disabled />
      <button className="btn" onClick={() => navigate('/')}>Back</button>
    </div>
  );
}

export default ReadMessage;