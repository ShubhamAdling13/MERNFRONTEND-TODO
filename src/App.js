
import './App.css';
import Login from './pages/Login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import AddNote from './pages/AddNote';
import PrivateRoute from './pages/PrivateRoute';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  
  return (
    <div className="App">
     
       <BrowserRouter>
       <Header/>
       <Routes>


  <Route path='/' element={<Login/>}  ></Route>
  <Route path='/register'  element={<Register/>}> </Route>


  <Route path='/home' element={<PrivateRoute element={Home}/>}> </Route>
   <Route path='/home/addNote' element={<PrivateRoute element={AddNote}/>}></Route>    
       
       
       </Routes>
       
     <Footer/>
     </BrowserRouter>

    </div>
  );
}

export default App;
