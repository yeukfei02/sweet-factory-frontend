import React from "react";
import { useHistory } from "react-router-dom";

function NavBar() {
  const history = useHistory();

  const token = localStorage.getItem("token");
  const isUserLoggedIn = token ? true : false;
  console.log("isUserLoggedIn = ", isUserLoggedIn);

  const handleHomeIconClick = () => {
    history.push("/");
  };

  const handleSignupClick = () => {
    history.push("/signup");
  };

  const handleLoginClick = () => {
    history.push("/login");
  };

  const handleLogoutClick = () => {
    localStorage.clear();
    history.push("/");
    window.location.reload();
  };

  const renderNavBarRightSideItems = (isUserLoggedIn) => {
    let resultDiv = (
      <form className="d-flex">
        <button
          className="btn btn-outline-primary mx-2"
          type="button"
          onClick={() => handleSignupClick()}
        >
          Signup
        </button>
        <button
          className="btn btn-outline-success mx-2"
          type="button"
          onClick={() => handleLoginClick()}
        >
          Login
        </button>
      </form>
    );

    if (isUserLoggedIn) {
      resultDiv = (
        <div className="d-flex flex-row align-items-center">
          <button
            className="btn btn-outline-danger mx-1"
            type="button"
            onClick={() => handleLogoutClick()}
          >
            Logout
          </button>
        </div>
      );
    }

    return resultDiv;
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div
            className="navbar-brand custom-cursor"
            onClick={() => handleHomeIconClick()}
          >
            Sweet Factory
          </div>
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
                <div className="nav-link"></div>
              </li>
            </ul>
            {renderNavBarRightSideItems(isUserLoggedIn)}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
