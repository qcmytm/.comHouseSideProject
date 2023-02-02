import React from "react";
import { Link } from "react-router-dom";

import AuthService from "../services/auth.service";

const NavComponent = ({ currentUser, setCurrentUser }) => {
  const handleLogout = () => {
    AuthService.logout(); //清空local storage
    window.alert("登出成功!現在您會被導向到首頁");
    setCurrentUser(null);
  };
  return (
    <div>
      <nav>
        <nav className=" navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-xl">
            <Link className="navbar-brand" to="/">
              .COM房屋
            </Link>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    首頁
                  </Link>
                </li>

                {!currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      註冊會員
                    </Link>
                  </li>
                )}

                {!currentUser && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      會員登入
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
                      HOUSE物件頁面
                    </Link>
                  </li>
                )}

                {currentUser && currentUser.user.role == "houseSeller" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/postHouse">
                      新增委賣物件
                    </Link>
                  </li>
                )}

                {currentUser && currentUser.user.role == "houseBuyer" && (
                  <li className="nav-item">
                    <Link className="nav-link" to="/appointment">
                      預約鑑賞房屋
                    </Link>
                  </li>
                )}
                {currentUser && currentUser.user.role == "houseBuyer" && (
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
          </div>
        </nav>
      </nav>
    </div>
  );
};

export default NavComponent;
