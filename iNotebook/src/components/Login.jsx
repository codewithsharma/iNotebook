import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();
  const [credential, setCredential] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credential.email,
          password: credential.password,
        }),
      });
      const json = await response.json();
  console.log(json); // Check the response in the browser console

      
      if (json.success) {
        localStorage.setItem("authToken", JSON.stringify(json));
        navigate("/");
        props.showAlert("Logged in Successfully", "success");
      } else {
        props.showAlert("Invalid Credential", "danger");
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
    console.log(credential);
  };
  return (
    <div>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">

            <div className="col-md-8 col-lg-7 col-xl-6">
              <img
                src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid"
                alt="Phone image"
              />
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <h1 className="my-3">Login</h1>
              <form onSubmit={handleSubmit}>
                {/* <!-- Email input --> */}
                <div className="form-outline mb-4">
                  <input
                    value={credential.email}
                    type="email"
                    id="email"
                    name="email"
                    className="form-control form-control-lg"
                    onChange={onChange}
                  />
                  <label className="form-label" htmlFor="email">
                    Email address
                  </label>
                </div>

                {/* <!-- Password input --> */}
                <div className="form-outline mb-4">
                  <input
                    value={credential.password}
                    onChange={onChange}
                    type="password"
                    id="password"
                    name="password"
                    className="form-control form-control-lg"
                  />
                  <label
                    className="form-label"
                    name="password"
                    htmlFor="password"
                  >
                    Password
                  </label>
                </div>

                {/* <!-- Submit button --> */}
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
