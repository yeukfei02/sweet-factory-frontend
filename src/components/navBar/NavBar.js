import React from "react";
import { useHistory } from "react-router-dom";

function NavBar(props) {
  const history = useHistory();

  const isUserLoggedIn = props.isUserLoggedIn;

  const handleHomeIconClick = () => {
    history.push("/");
  };

  const handleSignupClick = () => {
    history.push("/signup");
  };

  const handleLoginClick = () => {
    history.push("/login");
  };

  const renderNavBarItems = (isUserLoggedIn) => {
    let navBarItems = (
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <div className="nav-link"></div>
        </li>
      </ul>
    );

    if (isUserLoggedIn) {
      navBarItems = (
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <div className="nav-link">Zones</div>
          </li>

          <li className="nav-item">
            <div className="nav-link">Cities</div>
          </li>

          <li className="nav-item">
            <div className="nav-link">Machines</div>
          </li>

          <li className="nav-item">
            <div className="nav-link">Products</div>
          </li>
        </ul>
      );
    }

    return navBarItems;
  };

  const renderSignupAndLoginButton = (isUserLoggedIn) => {
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
      resultDiv = <div>username</div>;
    }

    return resultDiv;
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="navbar-brand" onClick={() => handleHomeIconClick()}>
            sweet-factory-frontend
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
            {renderNavBarItems(isUserLoggedIn)}
            {renderSignupAndLoginButton(isUserLoggedIn)}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
