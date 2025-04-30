import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';



const LoginPage = ({onLoginSuccess}) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(token){
            navigate("/data");
        }
    });

    const fetchUser = async () => {
        try {
            const { data } = await axios.post("http://localhost:3005/api/login", formData);
            if (data.token) {
                localStorage.setItem("token", data.token);
                setTimeout(() => {
                    navigate("/data");
                    onLoginSuccess();
                    toast.success("Login successful!");
                }, 2000);

            } else {
                console.log(data);
            }
        } catch (error) {
            toast.error(error.response?.data.message)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const { email, password } = formData;

        if (!email || !password) {
          return alert("All fields are required");
        }
        fetchUser();
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}
        >
            <div className="p-4 rounded shadow" style={{ backgroundColor: '#fff', width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            id="floatingInput"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <label htmlFor="floatingInput">Email address</label>
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

                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
            <Link className="nav-link text-center pt-3" to="/"><b>Home</b></Link>
            </div>
        </div>
    );
};

export default LoginPage;
