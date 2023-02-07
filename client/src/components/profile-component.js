import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const ProfileComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
  }, []);

  return (
    <div className="container-xl divContainer">
      {!currentUser && (
        <div>
          <p className="fs-2">在獲取您的個人資料之前，您必須先登入。</p>
          <button className="btn btn-primary btn" onClick={handleTakeToLogin}>
            跳轉登入頁面
          </button>
        </div>
      )}
      {currentUser && (
        <div>
          <h2>以下是您的個人檔案：</h2>

          <table className="table">
            <tbody>
              <tr>
                <td>
                  <strong>姓名：{currentUser.user.username}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>您的用戶ID: {currentUser.user._id}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>您註冊的電子信箱: {currentUser.user.email}</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>身份: {currentUser.user.role}</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ProfileComponent;
