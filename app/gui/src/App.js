import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateUser from './pages/CreateUserPage';
import UpdateUser from './pages/UpdateUserPage';
import UsersPage from './pages/UsersPage';
import LoginPage from './pages/LoginPage';
import UserDetails from './pages/UserDetailsPage';
import ProtectedRoute from './utils/auth.util';
import UnauthorizedPage from './pages/UnauthorizedPage';

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<ProtectedRoute element={<UsersPage />} adminOnly={true} />} />
        <Route path="/create" element={<ProtectedRoute element={<CreateUser />} adminOnly={true} />} />
        <Route path="/edit/:id" element={<ProtectedRoute element={<UpdateUser />} adminOnly={true} />} />
        <Route path="/userDetails/:id" element={<ProtectedRoute element={<UserDetails />} />} />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
      </Routes>
    </Router>
  );
}

export default App;
