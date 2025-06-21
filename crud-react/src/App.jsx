import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MessageList from './components/MessageList';
import CreateMessage from './components/CreateMessage';
import ReadMessage from './components/ReadMessage';
import UpdateMessage from './components/UpdateMessage';
import DeleteMessage from './components/DeleteMessage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MessageList />} />
          <Route path="create" element={<CreateMessage />} />
          <Route path="read/:id" element={<ReadMessage />} />
          <Route path="update/:id" element={<UpdateMessage />} />
          <Route path="delete/:id" element={<DeleteMessage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;