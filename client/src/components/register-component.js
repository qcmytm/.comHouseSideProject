import React, { useState } from "react";
import AuthService from "../services/auth.service";
import { useSpring, animated } from "react-spring";

const RegisterComponent = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [registerIn, setRegisterIn] = useState(false);

  const animation = useSpring({
    opacity: registerIn ? 1 : 0,
    transform: registerIn ? "translateY(0)" : "translateY(-100%)",
    config: { duration: 300 },
  });
  const handleNavigate = () => {
    const navigateButton = document.querySelector(".modal-footer .navigate");
    console.log(navigateButton);
    navigateButton.click();
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleRole = (e) => {
    setRole(e.target.value);
  };
  const handleRegister = () => {
    AuthService.register(username, email, password, role)
      .then(() => {
        setRegisterIn(true);
        setMessage("");
        setTimeout(() => {
          setRegisterIn(false);
          handleNavigate();
          setUsername("");
          setEmail("");
          setPassword("");
          setRole("");
        }, 2000);
      })
      .catch((e) => {
        setMessage(e.response.data);
      });
  };

  return (
    <div className="container-xl p-3">
      <div>
        {message && <div className="alert alert-danger">{message}</div>}
        {registerIn && (
          <animated.div className="alert down" style={animation}>
            <div className="px-md-5">註冊成功.您現在將被導向到登入頁面</div>
          </animated.div>
        )}
        <div>
          <label htmlFor="username">用戶名稱:</label>
          <input
            onChange={handleUsername}
            type="text"
            className="form-control"
            name="username"
            value={username}
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">電子信箱：</label>
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
            placeholder="長度至少超過6個英文或數字"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="role">身份：</label>
          <select
            class="form-select"
            aria-label="Default select example"
            onChange={handleRole}
            value={role}
          >
            <option selected>請選擇註冊身分:</option>
            <option value="houseBuyer">houseBuyer</option>
            <option value="houseSeller">houseSeller</option>
          </select>
        </div>
        <br />
        <button
          onClick={handleRegister}
          className="btn btn-primary ms-auto d-block"
        >
          <span>註冊會員</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
