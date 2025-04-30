import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from "./img.png";

const Navbar = ({ user, onLogout}) => {
  const location = useLocation();
  const collapseRef = useRef();

  const navLabel = location.pathname === "/data" ? "Home" : "Account";
  const navLink = location.pathname === "/" ? "/data" : "/";

  // Collapse menu programmatically
  const closeNavbar = () => {
    const navbar = collapseRef.current;
    if (navbar && navbar.classList.contains('show')) {
      const bsCollapse = new window.bootstrap.Collapse(navbar, { toggle: false });
      bsCollapse.hide();
    }
  };

  // Close on logout
  const handleLogout = () => {
    closeNavbar();
    onLogout();
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (collapseRef.current && !collapseRef.current.contains(event.target)) {
        closeNavbar();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);



  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <div className='d-flex align-items-center gap-1'>
      <img src={logo} alt=" " width={"22px"} height={"30px"}/>
      <Link className="navbar-brand" to="/" onClick={closeNavbar}>Expense Tracker</Link>
      </div>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarNavAltMarkup"
        ref={collapseRef}
      >
        <div className="navbar-nav text-center">
          {user ? (
            <>
              <Link className="nav-link" to={navLink} onClick={closeNavbar}>{navLabel}</Link>
              <span className="nav-link text-light">👤 {user.name}</span>
              <Link className="nav-link" to="/login" onClick={handleLogout}>Logout</Link>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login" onClick={closeNavbar}>Login</Link>
              <Link className="nav-link" to="/register" onClick={closeNavbar}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
