import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const LOGIN = gql`
  mutation login($input: LoginInput!) {
    login(input: $input) {
      message
      token
    }
  }
`;

function Login() {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login, { loading, error, data }] = useMutation(LOGIN);

  console.log("loading = ", loading);
  console.log("error = ", error);
  console.log("data = ", data);

  const handleEmailInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordInputChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginButtonClick = (email, password) => {
    if (email && password) {
      login({
        variables: {
          input: {
            email: email,
            password: password,
          },
        },
      });
    }
  };

  const renderLoginSuccessAlert = (data) => {
    let loginSuccessAlert = null;

    if (data && data.login) {
      localStorage.setItem("token", data.login.token);
      loginSuccessAlert = (
        <div className="alert alert-success" role="alert">
          Login success
        </div>
      );
      setTimeout(() => {
        history.push("/");
        window.location.reload();
      }, 1500);
    }

    return loginSuccessAlert;
  };

  return (
    <div className="m-5 d-flex justify-content-center">
      <div className="w-75">
        {renderLoginSuccessAlert(data)}

        <div className="card p-5">
          <h3 className="mb-3">Login</h3>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="Email"
              onChange={(e) => handleEmailInputChange(e)}
            />
            <label htmlFor="floatingInput">Email</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={(e) => handlePasswordInputChange(e)}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <button
            type="submit"
            className="btn btn-outline-success mt-3"
            onClick={() => handleLoginButtonClick(email, password)}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
