import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_USER_BY_ID = gql`
  query getUserById($id: Int) {
    getUserById(id: $id) {
      message
      user {
        id
        email
        password
        created_at
        updated_at
      }
    }
  }
`;

function NavBar() {
  const history = useHistory();

  const [userEmail, setUserEmail] = useState("");

  let userIdInt = 0;
  const userIdStr = localStorage.getItem("user_id");
  if (userIdStr) {
    userIdInt = parseInt(userIdStr, 10);
  }

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { id: userIdInt },
  });

  console.log("loading = ", loading);
  console.log("error = ", error);
  console.log("data = ", data);

  const token = localStorage.getItem("token");
  const isUserLoggedIn = token ? true : false;
  console.log("isUserLoggedIn = ", isUserLoggedIn);

  useEffect(() => {
    if (data && data.getUserById) {
      const userEmail = data.getUserById.user.email;
      setUserEmail(userEmail);
    }
  }, [data]);

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
          <div className="mx-2">{userEmail}</div>
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
