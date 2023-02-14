import React from "react";
import { Link } from "react-router-dom";
import sni1 from "../assets/images/group197.png";
import AuthService from "../services/auth.service";
import UserModalComponent from "./UserModal-component.js";
import UserImg from "../assets/images/User.png";

const NavComponent = ({ currentUser, setCurrentUser }) => {
  const handleLogout = () => {
    AuthService.logout(); //清空local storage
    window.alert("登出成功!現在您會被導向到首頁");
    setCurrentUser(null);
  };
  return (
    <nav className="navbar navbar-expand-md navbar-light bg-white">
      <nav className="container-xl">
        <Link className="navbar-brand py-0" to="/">
          <img src={sni1} className="navImg" alt=".com房屋" />
        </Link>
        <UserModalComponent
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i class="fa-solid fa-bars"></i>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                首頁
              </Link>
            </li>

            {!currentUser && (
              <li className="nav-item">
                <Link
                  className="nav-link"
                  data-bs-toggle="modal"
                  to="#exampleModalToggle"
                >
                  <img src={UserImg} style={{ height: "25px" }} alt="user" />{" "}
                  登入/註冊會員
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link onClick={handleLogout} className="nav-link" to="/">
                  登出
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  個人頁面
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link className="nav-link" to="/house">
                  HOUSE物件
                </Link>
              </li>
            )}

            {currentUser && currentUser.user.role === "houseSeller" && (
              <li className="nav-item">
                <Link className="nav-link" to="/postHouse">
                  新增委賣物件
                </Link>
              </li>
            )}

            {currentUser && currentUser.user.role === "houseBuyer" && (
              <li className="nav-item">
                <Link className="nav-link" to="/appointment">
                  預約鑑賞房屋
                </Link>
              </li>
            )}
            {currentUser && currentUser.user.role === "houseBuyer" && (
              <li className="nav-item">
                <Link className="nav-link" to="/search">
                  搜尋房屋
                </Link>
              </li>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                關於網頁
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </nav>
  );
};

export default NavComponent;
