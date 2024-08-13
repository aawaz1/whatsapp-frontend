import {BrowserRouter as Router , Route,Routes, Navigate} from 'react-router-dom'
import Login from './pages/login';
import Register from './pages/register';
import Home from './pages/home';
import { useSelector } from 'react-redux';
// socket.io
// import socket = io(process.env.REACT_API_ENDPOINT)





function App() {
  const {user} = useSelector(state => state.user)
  const {token} = user
 
  return (
   <div className='dark'>
   <Router>
      <Routes>
        <Route path='/' element={ token ? (<Home/>) : (<Navigate to='/login'/>)}/>
        <Route path='/login' element={!token? (<Login/>) : (<Navigate to='/'/>)}/>
        <Route path='/register' element={!token ? (<Register/>) : (<Navigate to='/'/>)}/>
        </Routes>
    </Router>
   </div>
  );
}

export default App;
