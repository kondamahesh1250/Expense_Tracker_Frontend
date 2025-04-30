import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(()=>{
          const token = localStorage.getItem("token");
          if(token){
              navigate("/data");
          }
      });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const { name, email, password, confirmPassword } = formData;
    const userData = { name, email, password };
  
    if (!name || !email || !password || !confirmPassword) {
      return alert("All fields are required");
    }
    
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

  
    try {
      const { data } = await axios.post(`${apiUrl}/api/register`, userData);
      setTimeout(() => {
        navigate("/login");
        toast.success(data.message);
        setFormData({
          email: '',
          password: '',
      });
      }, 2000);
      
    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);
      toast.error(error.response?.data.message)
    }
  };
  

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}
    >
      <div className="p-4 rounded shadow" style={{ backgroundColor: '#fff', width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              name="name"
              className="form-control"
              id="floatingName"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="floatingName">Full Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              id="floatingEmail"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="floatingEmail">Email address</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              name="confirmPassword"
              className="form-control"
              id="floatingConfirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            <label htmlFor="floatingConfirmPassword">Confirm Password</label>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
        <Link className="nav-link text-center pt-3" to="/"><b>Home</b></Link>
      </div>
    </div>
  );
};

export default RegisterPage;
