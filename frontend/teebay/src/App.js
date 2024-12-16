import './App.css';
import { useQuery, gql } from "@apollo/client";
import { useAuthContext } from './context/AuthContext.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
function App() {
  const {authUser} = useAuthContext();  

  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={authUser ? <Navigate to='/' /> : <Login />} />
        <Route path="/" element={authUser ? <Home /> : <Navigate to='/login' />} />
        <Route path="/signup" element={authUser ? <Navigate to='/' /> : <Signup />} />

      </Routes>
    </div>
  );
}

export default App;
