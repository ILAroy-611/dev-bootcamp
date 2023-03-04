// import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { reset } from "../Redux/Slices/AuthSlice";
import { getAllBootcamps } from "../Redux/Thunks/BootCampThunk";
import "../Styles/header.css";

function Header() {
  const { user,isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showAcount, setShowAccount] =useState(false)

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(reset());
    
  };
  return (
    <header className="primary-header">
      <div className="container flex">
        <div className="brand">
          <NavLink to="/" className="link flex brand-link">
            <img src="dev_bootcamp.png" alt="" height="58px" className="logo" />
            <h1>DevCamper</h1>
          </NavLink>
        </div>
        {isLoggedIn ? (
          <nav className="navbar primary-navbar">
            <ul className="flex">
            { user?.role=='publisher' ?
            <li>
                <NavLink to="/bootcamps/createNew" className="link" >
                  Create BootCapms
                </NavLink>
              </li>:<></> }
              <li>
                <NavLink to="/bootcamps" className="link" >
                  BootCapms
                </NavLink>
              </li>
              <li>
                <div className="account-tab link" onMouseEnter={()=>setShowAccount(true)}>
                  Account
                  {showAcount?
                  <ul className="account-options" onMouseLeave={()=>setShowAccount(false)}>
                  <li>
                  <i className="fa-solid fa-user"></i>
                    <NavLink to="/me" className="link">
                      Profile
                    </NavLink>
                  </li>
                  <li>
                  <i className="fa-solid fa-right-from-bracket"></i>
                    <NavLink
                      to="/login"
                      onClick={handleLogout}
                      className="link">
                        Logout
                    </NavLink>
                  </li>
                </ul>
                :
                <></>}
                  
                </div>
              </li>
            </ul>
          </nav>
        ) : (
          <nav className="navbar primary-navbar">
            <ul className="flex">
              <li>
                <NavLink to="/login" className="link">
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to="/register" className="link">
                  Register
                </NavLink>
              </li>
              <li>
                <NavLink to="/bootcamps" className="link">
                  BootCapms
                </NavLink>
              </li>
            </ul>
          </nav>
        )}

        <div className="hambuger-navbar">
          <i className="fa-solid fa-bars"></i>
        </div>
      </div>
    </header>
  );
}

export default Header;
