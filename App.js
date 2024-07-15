import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import ToDoApp from './pages/ToDoApp';
import Register from './pages/Register';


const App = () => {
  return (
    <BrowserRouter>
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ToDoApp" element={<ToDoApp />} />
      </Routes>
    </Router>
    </BrowserRouter>
  );
};

export default App;
