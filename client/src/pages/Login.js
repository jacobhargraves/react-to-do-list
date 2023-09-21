import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Login = (props) => {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // function to update the state of the form as input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      // retrieve data from the login mutation using the user's input email and password
      const { data } = await login({
        variables: { ...formState },
      });
      // console.log(data);
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form
    setFormState({
      email: "",
      password: "",
    });
  };

  return (
    <div className="container">
      {data ? (
        <p>View your profile to create a todo list!</p>
      ) : (
      <div className="row d-flex justify-content-center">
        <main className="col-lg-6 col-md-12 card shadow-lg form-signin m-auto">
          <form className="m-2" onSubmit={handleFormSubmit}>
            <h2 className="h3 mb-3 fw-normal">Please log in</h2>

            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                name="email"
                placeholder="name@example.com"
                value={formState.email}
                onChange={handleChange}
              ></input>
              <label htmlFor="floatingInput">Email address</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                name="password"
                placeholder="Password"
                value={formState.password}
                onChange={handleChange}
              ></input>
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn my-3 btn-success w-50 py-2" type="submit">
                Login
              </button>
            </div>
          </form>
        </main>
      </div>
      )}
      {error && (
        <div className="my-3 p-3 bg-danger text-white">
          {error.message}
        </div>
      )}
    </div>
  );
};

export default Login;
