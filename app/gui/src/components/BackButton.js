import React from 'react';
import {FaArrowLeft} from 'react-icons/fa';
import {useNavigate} from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      id="back-button"
      className="btn btn-secondary"
      onClick={() => navigate(-1)}
      style={{backgroundColor: '#007bff', color: '#fff', display: 'flex', alignItems: 'center'}}
    >
      <FaArrowLeft style={{color: '#fff', marginRight: '0.5rem'}} />
      Back
    </button>
  );
};

export default BackButton;
