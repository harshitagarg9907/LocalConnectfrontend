import React from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

function NavBar() {
  return (
   
        <nav className="main-navbar">

            {/* LEFT SIDE - LOGO */}

               <span className="brand-logo">🏪</span>
                <span className="brand-name">
                    Local<span>Connect</span>
                </span>
           

            {/* RIGHT SIDE - BUTTONS */}

            <div className="nav-buttons">

                <Link to="/login" className="login-btn">
                    Login
                </Link>

                <Link to="/signup" className="signup-btn">
                    Sign Up
                </Link>

            </div>
  
        </nav>
      
    )
}

export default NavBar
