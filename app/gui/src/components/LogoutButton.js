import React from 'react';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';

function LogoutButton() {
  const handleLogout = () => {
    Cookies.remove('token', {secure: true, sameSite: 'strict'});
  };

  return (
    <Link id="logout-button" to="/login" className="btn btn-danger btn-lg" onClick={handleLogout}>
      Logout
    </Link>
  );
}

export default LogoutButton;
