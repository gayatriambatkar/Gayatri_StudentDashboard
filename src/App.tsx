import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AddStudent from './pages/AddStd';
import EditStudent from './pages/EditStd';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddStudent />} />
        <Route path="/edit/:id" element={<EditStudent />} />
      </Routes>
    </div>
  );
}

export default App;
