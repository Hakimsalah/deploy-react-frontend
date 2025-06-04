import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole } from './authUtils';

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const role = getUserRole();
  //const role  = "ADMIN" ; 
  
  

  if (role === "VISITOR") {
    return <Navigate to="/Homepage" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/Homepage" replace />;
  }

  return children;
};

export default RoleProtectedRoute;