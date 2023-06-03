
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Profile from './components/Profile';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import '../assets/style.css';
import './assets/style.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
