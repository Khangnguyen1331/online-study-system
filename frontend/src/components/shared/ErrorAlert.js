// src/components/shared/ErrorAlert.js - FILE MỚI
import React from 'react';

const ErrorAlert = ({ message }) => {
  if (!message) return null;
  
  return (
    <div className="alert alert-danger" role="alert">
      {message}
    </div>
  );
};

export default ErrorAlert;