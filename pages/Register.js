import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import '../styles/style.css';

const Register = () => {
  const [lightMode, setLightMode] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [image, setImage] = useState(null);
  const [isMobileMode, setIsMobileMode] = useState(false); // State for mobile mode detection
  const router = useRouter();

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

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.onerror = error => {
      console.log("Error: ", error);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (password !== cpassword) {
      setError('Passwords do not match');
      return;
    }
  
    axios.post('http://localhost:5036/signupres', { email, password, cpassword, image })
      .then((result) => {
        console.log(result.data);
        setSuccess(result.data.message);
        setError('');
        // Redirect to login page
        router.push('/Login');
      })
      .catch(err => console.log(err));
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
    <div className="register-body">
      <div className={`container ${lightMode ? 'light-mode' : ''} mx-auto p-4`}>
        <div className="header">
          <div className="header-title">
            <h1 className="text-3xl font-bold">TO DO APP</h1>
            <p>Stop Procrastinating, Start Organizing</p>
          </div>
          <div className="user-icon">
            <img
              id="lightModeImage"
              src={lightMode ? 'Group2.png' : 'Group.png'}
              alt="Toggle Light Mode"
              onClick={toggleLightMode}
              className="cursor-pointer"
            />
            <img src="photo.png" alt="Profile" className="ml-2" />
          </div>
        </div>
        <hr className="hr-line" />
        <div className="login">
          <p className="text-white text-3xl">Register</p>
        </div>
        <form onSubmit={handleSubmit} className="login-form space-y-4">
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full max-w-md h-10 px-2 rounded-lg bg-gray-800 text-white"
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full max-w-md h-10 px-2 rounded-lg bg-gray-800 text-white"
          />
          <input
            type="password"
            name="cpassword"
            placeholder="Confirm Password"
            value={cpassword}
            onChange={(e) => setCpassword(e.target.value)}
            required
            className="w-full max-w-md h-10 px-2 rounded-lg bg-gray-800 text-white"
          />
          <div className="profile">
            <label htmlFor="profileImage" className="file-input-label w-full max-w-md h-10 px-4 bg-white text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-300 cursor-pointer flex items-center justify-center">
              Choose Profile Image
              <input
                id="profileImage"
                accept="image/*"
                type="file"
                onChange={handlePictureChange}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          {image && <img width={100} height={100} src={image} alt="Preview" />}

          <p className="text-white">
            Already have an account?{' '}
            <a href="/Login" className="text-blue-400">Login</a>
          </p>
          <input
            type="submit"
            value="Register"
            className="w-full max-w-md h-10 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300 cursor-pointer"
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
          {success && <p className="text-green-500 mt-2">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default Register;
