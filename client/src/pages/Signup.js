import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";

import Auth from "../utils/auth";

const Signup = () => {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

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
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="container">
      <div className="row d-flex justify-content-center">
        <main className="col-lg-6 col-md-12 card shadow-lg form-signin m-auto">
          <form className="m-2" onSubmit={handleFormSubmit}>
            <h2 className="h3 mb-3 fw-normal">Please Sign Up!</h2>

            <div className="form-floating m-2">
            <input
                type="text"
                className="form-control"
                id="floatingUser"
                name="username"
                placeholder="username"
                value={formState.username}
                onChange={handleChange}
              ></input>
              <label htmlFor="floatingUser">Username</label>
            </div>
            <div className="form-floating m-2">
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
            <div className="form-floating m-2">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                name="password"
                placeholder="********"
                value={formState.password}
                onChange={handleChange}
              ></input>
              <label htmlFor="floatingPassword">Password</label>
            </div>
            <div className="d-flex justify-content-center">
              <button className="btn my-3 btn-success w-50 py-2" type="submit">
                Sign Up
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Signup;
