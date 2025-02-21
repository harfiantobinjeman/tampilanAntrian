import './App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import AntrianM from '../src/antrianM/AntrianM';
import Tampilan from '../src/tampilan/Api';
import OperatorList from '../src/operator';
import Login from '../src/login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<AntrianM/>} />
        <Route path="/tampilan" element={<Tampilan/>} />
        <Route path="/operator" element={<OperatorList/>} />
        <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
