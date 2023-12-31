import React from 'react'
import { Navigate } from 'react-router-dom'


function withAuth(Component) {
  return (props) => {
    
    if(localStorage.getItem("token")){    
    return <Component {...props} />
    }

    return <Navigate to="/Login" replace />
  
    }
}

export default withAuth