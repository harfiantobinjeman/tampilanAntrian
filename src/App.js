import './App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import AntrianM from '../src/antrianM/AntrianM';
import Tampilan from '../src/tampilan/Api';
import OperatorList from '../src/operator';
import Login from '../src/login/Login';
import Admin from './Admin';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<AntrianM/>} />
        <Route path="/tampilan" element={<Tampilan/>} />
        <Route path="/operator" element={<OperatorList/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/admin" element={<Admin/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
