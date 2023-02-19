import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import AuthService from "../services/auth.service";

const LoginComponent = ({ setCurrentUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const animation = useSpring({
    opacity: loggedIn ? 1 : 0,
    transform: loggedIn ? "translateY(0)" : "translateY(-100%)",
    config: { duration: 300 },
  });
  const handleClose = () => {
    const closeButton = document.querySelector(".btn-close");
    closeButton.click();
  };
  const handleLogin = async () => {
    try {
      let response = await AuthService.login(email, password);
      localStorage.setItem("user", JSON.stringify(response.data));
      setCurrentUser(AuthService.getCurrentUser());
      setLoggedIn(true);
      setMessage("");
      setTimeout(() => {
        navigate("/profile");
        handleClose();
        setEmail("");
        setPassword("");
        setLoggedIn(false);
      }, 2000);
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
    <div className="container-xl p-md-5">
      <div>
        {message && <div className="alert alert-danger">{message}</div>}
        {loggedIn && (
          <animated.div className="alert down" style={animation}>
            <div className="px-md-5"> 登 錄 成 功 ！</div>
          </animated.div>
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
