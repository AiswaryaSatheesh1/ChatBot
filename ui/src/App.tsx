import './App.css'
import { Routes, Route} from 'react-router-dom';
import Signup from './components/signup';
import Login from './components/login';
import Chat from "./components/chat"


const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} /> 
         <Route path="/" element={<Login />} /> 
         <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
};

export default App;
