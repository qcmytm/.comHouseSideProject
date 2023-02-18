import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const LoginComponent = ({ setCurrentUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleClose = () => {
    const closeButton = document.querySelector(".btn-close");
    closeButton.click();
  };
  const handleLogin = async () => {
    try {
      let response = await AuthService.login(email, password);
      localStorage.setItem("user", JSON.stringify(response.data));
      setCurrentUser(AuthService.getCurrentUser());
      setIsLoggedIn(true);
      navigate("/profile");
      handleClose();
      setEmail("");
      setPassword("");
      setMessage("");
    } catch (e) {
      setMessage(e.response.data);
    }
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="container-xl p-5">
      <div>
        {message && <div className="alert alert-danger">{message}</div>}
        {isLoggedIn && (
          <div>
            <p>Login successful!</p>
          </div>
        )}
        <div className="form-group">
          <label htmlFor="username">電子信箱：</label>
          <input
            onChange={handleEmail}
            type="text"
            className="form-control"
            name="email"
            value={email}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">密碼：</label>
          <input
            onChange={handlePassword}
            type="password"
            className="form-control"
            name="password"
            value={password}
          />
        </div>
        <br />
        <div className="form-group d-flex justify-content-end">
          <button onClick={handleLogin} className="btn btn-primary btn-block ">
            <span>登入系統</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
