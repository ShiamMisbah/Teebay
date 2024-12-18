import './App.css';
import { useQuery, gql } from "@apollo/client";
import { useAuthContext } from './context/AuthContext.jsx';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Signup from './pages/Signup.jsx';
import Topbar from './components/Topbar.jsx';
import ProductForm from './pages/ProductForm.jsx';
import MyProduct from './pages/MyProduct.jsx';
import EditProductForm from './pages/EditProductForm.jsx';
import ProductProfile from './pages/ProductProfile.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
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
            path="/myDashboard"
            element={authUser ? <UserDashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/productForm"
            element={authUser ? <ProductForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/myProduct"
            element={authUser ? <MyProduct /> : <Navigate to="/login" />}
          />
          <Route
            path="/editProduct/:id"
            element={authUser ? <EditProductForm /> : <Navigate to="/login" />}
          />
          <Route
            path="/viewProduct/:id"
            element={authUser ? <ProductProfile /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
