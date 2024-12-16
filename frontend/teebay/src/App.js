import './App.css';
import { useQuery, gql } from "@apollo/client";
import { useAuthContext } from './context/AuthContext.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import Topbar from './components/Topbar.jsx';
import ProductForm from './pages/ProductForm.jsx';
function App() {
  const {authUser} = useAuthContext();  

  return (
    <div className="app">
      {authUser && <Topbar />}
      <div className="content">
        <Routes>
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/productForm"
            element={authUser ? <ProductForm /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
