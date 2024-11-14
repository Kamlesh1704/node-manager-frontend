
import React from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { FaRegNoteSticky } from "react-icons/fa6";

const Navbar = () => {
  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate('/login')
  }
  let location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
        <h1   className="navbar-brand ml-5">Testaing Note Manager</h1>
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
          {localStorage.getItem("token") && 
            <ul className="navbar-nav me-auto mb-5 mb-lg-0">
              <li className="nav-item">
                <Link style={{marginRight:"15px",marginLeft:"30px"}} className={`nav-link ${location.pathname==="/"?"active": ""}`} to="/">
                  New <FiEdit />
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/allnotes"?"active": ""}`} to="/allnotes">
                  All Notes <FaRegNoteSticky />
                </Link>
              </li>
            </ul>
          }
          {!localStorage.getItem('token')?<form  className="d-flex" role="search">
            <Link className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
            <Link className="btn btn-primary mx-1" to="/signup" role="button">Sign Up</Link>
          </form>:<button onClick={handleLogout} className="btn btn-primary">Logout</button>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
