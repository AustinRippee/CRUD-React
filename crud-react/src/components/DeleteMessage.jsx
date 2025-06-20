import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Form.css';

function DeleteMessage() {
  const { id } = useParams();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`/api/messages/${id}`)
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, [id]);

  const handleDelete = e => {
    e.preventDefault();
    fetch(`/api/messages/${id}`, { method: 'DELETE' })
      .then(() => navigate('/'));
  };

  return (
    <div className="card">
      <h1>Delete Message</h1>
      <label>Delete message?</label>
      <input value={message} disabled /><br />
      <form onSubmit={handleDelete}>
        <input className="btn" type="submit" value="Confirm Delete" />
      </form>
      <button className="btn" onClick={() => navigate('/')}>Cancel</button>
    </div>
  );
}

export default DeleteMessage;