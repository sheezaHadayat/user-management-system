import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const LoginPage = () => {
  const [email, setEmail] = useState("example@gmail.com");
  const [password, setPassword] = useState("1234567");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (email === "example@gmail.com" && password === "1234567") {
      navigate("/user-listing");
    } else {
      alert("Incorrect credentials");
    }
  };

  return (
 
      
    
        <div className="container mt-5 mb-5 rounded-lg ">
      <div className="row justify-content-center ">
        <div className="col-md-4 shadow p-4 bg-light ">
       <center><h4>Login</h4></center>
       <center><p>Welcome, please enter your email and password to continue.</p>  </center> 
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <center><button className="btn btn-primary mt-5 mb-5 w-100" onClick={handleLogin}>
            Login
          </button></center>
          
         
        </div>
       
      </div>
     
    </div>
   
  );
};

export default LoginPage;
