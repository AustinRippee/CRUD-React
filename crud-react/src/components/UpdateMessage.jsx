import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Form.css';

function UpdateMessage() {
  const { id } = useParams();
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/messages/${id}`)
      .then(res => res.json())
      .then(data => setMsg(data.message));
  }, [id]);

  const handleSubmit = e => {
    e.preventDefault();
    fetch(`/api/messages/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ msg })
    }).then(() => navigate('/'));
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h1>Update Message</h1>
      <label>message:</label>
      <input value={msg} onChange={e => setMsg(e.target.value)} required />
      <input className="btn" type="submit" value="Submit" />
    </form>
  );
}

export default UpdateMessage;