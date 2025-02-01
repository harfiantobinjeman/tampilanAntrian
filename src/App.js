import './App.css';
import { BrowserRouter,Routes,Route } from "react-router-dom";
import AntrianM from '../src/antrianM/AntrianM';
import Tampilan from '../src/tampilan/Api'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<AntrianM/>} />
        <Route path="/tampilan" element={<Tampilan/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
