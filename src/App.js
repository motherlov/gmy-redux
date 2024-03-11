
import './App.css';
 import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './Component/Auth/Login/Login';
import Register from './Component/Auth/Register/Register';
function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Routes>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
