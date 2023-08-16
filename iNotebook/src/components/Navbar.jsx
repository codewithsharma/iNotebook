import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const Navigate = useNavigate()
  const handelLogout = ()=>{
    localStorage.removeItem('authToken')
    Navigate("/login")
    
  }
  const location = useLocation();
  useEffect(() => {}, [location]);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          i-notebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : null
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : null
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          <div>
          {!localStorage.getItem('authToken')?<form className="d-flex" role="search">
           
           <Link to="/signup" className="btn-primary mx-2 btn">Sign up</Link>
           <Link to="/login" className="btn-primary mx-2 btn">Login</Link>
          </form>
          :<button onClick={handelLogout} className="btn-primary mx-2 btn">LogOut</button> }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
