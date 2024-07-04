
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Products from './Componets/Products';
import AddProducts from './Componets/AddProducts';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Login from './Componets/Login';
import ShowCart from './Componets/ShowCart';

function App() {
  return (
    <>
   <Routes>
    <Route path='/Home' element={<Products/>}></Route>
    <Route path='/Products' element={<AddProducts/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/Cart' element={<ShowCart/>}></Route>
   </Routes>
  <ToastContainer/>
    </>
  );
}

export default App;
