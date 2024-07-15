import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

import '../styles/style.css'; // Ensure styles.css has Tailwind directives

const Login = () => {
  const [lightMode, setLightMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [isMobileMode, setIsMobileMode] = useState(false); // State to track mobile mode

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Client-side code
      if (lightMode) {
        document.body.classList.add('light-mode');
      } else {
        document.body.classList.remove('light-mode');
      }
    }
  }, [lightMode]);

  const toggleLightMode = () => {
    setLightMode(!lightMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5036/loginres', { email, password });
      if (response.status === 200) {
        localStorage.setItem('userImage', response.data.image);
        router.push('/ToDoApp');
      }
      if (result.data.message === "Login Successful") {
        localStorage.setItem('token', result.data.token)
        alert('Login In Successfully')
    } else {
      alert(result.data.message)
    }

    } catch (error) {
      console.error('Login error:', error);
      if (error.response) {
        setError(error.response.data.message); // Display the specific error message from the server
      } 
    }
  };
  
  

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth <= 640) {
          const lightModeImage = document.getElementById('lightModeImage');
          if (lightModeImage) {
            lightModeImage.style.display = 'none';
          }
          setIsMobileMode(true);
        } else {
          const lightModeImage = document.getElementById('lightModeImage');
          if (lightModeImage) {
            lightModeImage.style.display = 'block';
          }
          setIsMobileMode(false);
        }
      }
    };

    // Add event listener for resize
    window.addEventListener('resize', handleResize);

    // Initial check on component mount
    handleResize();

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`container ${lightMode ? 'light-mode' : ''}`}>
      <div className="header">
        <div className="header-title">
          <h1 className="text-3xl font-bold">TO DO APP</h1>
          <p>Stop Procrastinating, Start Organizing</p>
        </div>
        <div className="user-icon">
          <img
            id="lightModeImage"
            src={lightMode ? '/Group2.png' : '/Group.png'}
            alt="Toggle Light Mode"
            onClick={toggleLightMode}
          />
          <img
            src="/photo.png"
            alt="Profile"
            className="ml-2"
          />
        </div>
      </div>
      <hr className="hr-line" />
      <div className="login">
        <p className="text-white text-3xl">Login</p>
      </div>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full max-w-md h-10 px-2 rounded-lg bg-gray-800 text-white mb-2"
          required
        />
        <input
          type="password"
          id="pwd"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full max-w-md h-10 px-2 rounded-lg bg-gray-800 text-white mb-2"
          required
        />
        <p className="text-white">
          Don't have an account yet? <span className="underline-word"><a href="Register" className="text-blue-400">Signup</a></span>
        </p>
        <input
          type="submit"
          value="Login"
          className="w-40 h-10 px-4 mt-2 rounded-lg bg-white text-gray-800 hover:bg-gray-300 cursor-pointer"
        />
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
