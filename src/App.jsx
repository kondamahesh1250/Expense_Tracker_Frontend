import { useEffect, useState } from 'react'
import './App.css'
import Expense_Track from './Components/Expense_Track'
import LoginPage from './Components/LoginPage'
import RegisterPage from './Components/RegisterPage'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Navbar from './Components/Navbar'
import axios from 'axios'
import LandingPage from './Components/LandingPage'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [user, setUser] = useState();
  
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const { data } = await axios.get("http://localhost:3005/api/get-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data.user);
      }
    } catch (error) {
      console.log("User fetch failed", error?.message);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successful!");
    navigate("/login");
    setUser(null);  // Clear user state on logout
  };

  return (
    <>
      <Navbar user={user} onLoginSuccess={fetchUser} onLogout={handleLogout}/>
      <Routes>
        <Route path='/' element={<LandingPage />}/>
        <Route path='/data' element={<Expense_Track />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage onLoginSuccess={fetchUser} />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App
