import React from "react";
import { Link } from "react-router-dom";

import Auth from "../../utils/auth";

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <div className="container">
    <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div>
          <Link className="text-success text-decoration-none" to="/">
            <h2 className="m-0">Todo List</h2>
          </Link>
          <p className="m-0">Easily track and complete your Todos</p>
        </div>
      <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
        <li>
          <Link className="text-success text-decoration-none" to="/">
            <p className="m-0">Home</p>
          </Link>
        </li>
      </ul>
      <div className="col-md-3 text-end">
      {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-dark m-2" to="/login">
                Login
              </Link>
              <Link className="btn btn-success m-2" to="/signup">
                Signup
              </Link>
            </>
          )}
      </div>
    </header>
    </div>
  );
};

export default Header;
