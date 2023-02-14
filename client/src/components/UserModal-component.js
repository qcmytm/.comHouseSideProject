import React from "react";
import LoginComponent from "./login-component";
import RegisterComponent from "./register-component";

const UserModalComponent = ({ currentUser, setCurrentUser }) => {
  return (
    <div>
      <div
        class="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalToggleLabel">
                .COM登入
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <LoginComponent
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            </div>
            <div class="modal-footer justify-content-center ">
              <h5>如果您還未成為會員~請點擊</h5>
              <button
                class="btn btn-primary "
                data-bs-target="#exampleModalToggle2"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                註冊會員
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabindex="-1"
      >
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalToggleLabel2">
                .COM註冊
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <RegisterComponent />
            </div>
            <div class="modal-footer">
              <button
                class="btn btn-primary navigate"
                data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal"
                data-bs-dismiss="modal"
              >
                返回登入
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserModalComponent;
