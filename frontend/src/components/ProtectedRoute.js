import React from 'react';
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...props  }) => {
  return (
    // <Route>
    props.isLoggedIn ? <Component {...props} /> : <Navigate to="/sign-in" replace/>
    // </Route>
)}

export default ProtectedRoute; 