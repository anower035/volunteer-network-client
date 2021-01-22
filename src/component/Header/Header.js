import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import Images from '../../Images/Icons/logo.png';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div>
            <div >
            <nav className="navbar navbar-expand-lg text-light ">
              <div className="container">
                <Link to="/">
                  <img id="logo" className="navbar-brand custom-logo" src={Images} alt=""/>
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="/navbarSupportedContent" aria-control="navbarSupportContent" aria-expanded="false" aria-lable="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className=" navbar-collapse">
                  <ul className="navbar-nav ml-auto">                  
                    <li className="nav-item active">
                      <Link className="nav-link mx-2" to="/home">Home</Link>
                    </li>
                    <li className="nav-item  mx-2">
                      <Link className="nav-link" to="/donation">Donation</Link>
                    </li>
                    <li className="nav-item  mx-2">
                      <Link className="nav-link" to="/events">Events</Link>
                    </li>
                    <li className="nav-item mx-2">
                      <Link className="nav-link" to="/blog">Blog</Link>
                    </li>
                  </ul>
                  <h3 id="username">{loggedInUser.email}</h3>
                  <Link to="/registrationList" id="logInButton" className="btn btn-primary">Register</Link>
                  <Link to="/admin" id="logOutButton" className="btn btn-dark my-2 my-sm-">Admin</Link>
                  <button id="logOutButton" className="btn btn-danger my-2 my-sm-" onClick={() => setLoggedInUser({})}>Logout</button>
                </div>
              </div>
            </nav>
          </div>
          <br/>     
        </div>
    );
};

export default Header;