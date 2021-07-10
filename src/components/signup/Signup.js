import React, { useState } from "react";

import { gql, useMutation } from "@apollo/client";

const SIGN_UP = gql`
  mutation signup($input: SignupInput!) {
    signup(input: $input) {
      message
    }
  }
`;

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [signup, { loading, error, data }] = useMutation(SIGN_UP);

  console.log("loading = ", loading);
  console.log("error = ", error);
  console.log("data = ", data);

  const handleEmailInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordInputChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignupButtonClick = (email, password) => {
    if (email && password) {
      signup({
        variables: {
          input: {
            email: email,
            password: password,
          },
        },
      });
    }
  };

  const renderSignupSuccessAlert = (data) => {
    let signupSuccessAlert = null;

    if (data && data.signup) {
      signupSuccessAlert = (
        <div className="alert alert-success" role="alert">
          Signup success
        </div>
      );
    }

    return signupSuccessAlert;
  };

  return (
    <div className="m-5 d-flex justify-content-center">
      <div className="w-75">
        {renderSignupSuccessAlert(data)}

        <div className="card p-5">
          <h3 className="mb-3">Signup</h3>
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
            className="btn btn-outline-primary mt-3"
            onClick={() => handleSignupButtonClick(email, password)}
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
