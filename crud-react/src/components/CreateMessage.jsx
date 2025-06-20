import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Form.css';

function CreateMessage() {
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://localhost:5000/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: msg })  // <-- key name must match backend
    })
      .then(() => navigate('/'))
      .catch(err => console.error('Create error:', err));
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h1>Create Message</h1>
      <label>message:</label>
      <input value={msg} onChange={e => setMsg(e.target.value)} required />
      <input className="btn" type="submit" value="Submit" />
    </form>
  );
}

export default CreateMessage;