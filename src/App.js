
import './App.css';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       
       <Routes>


  <Route path='/' element={<Login/>}  ></Route>
  <Route path='/register'  element={<Register/>}> </Route>

       </Routes>
       
       
       
       </BrowserRouter>
    </div>
  );
}

export default App;
