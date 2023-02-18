import React from "react";
import { Link } from "react-router-dom";
import SlideComponent from "../components/slide-component";

const HomeComponent = ({ currentUser }) => {
  return (
    <main>
      <SlideComponent />
      <div className="container-xl py-4">
        <div className="p-5 mb-4 bg-light rounded-3 mainBG d-flex justify-content-center ">
          <div className="pe-md-5 py-2 py-md-5">
            <h3 className=" fw-bold textShadow">透過.COM輕鬆找到目標客群</h3>

            <p className="pe-5 fs-4 textShadow">
              .COM利用網站自身的強大流量資源與用戶資源
              <br />
              將您的物件即時地展現在用戶面前
              <br />
              獲得更多潛在客戶的關注
            </p>
          </div>
        </div>
        <div className="container">
          <div className="row align-items-md-stretch justify-content-center userHouse">
            <div className="col-sm-6 col-lg-4">
              <div className="h-100 p-5 p-sm-4 text-light rounded-3  seller">
                <h3>
                  <i class="fa-solid fa-house"></i> 我要刊登物件
                </h3>
                <p>
                  成為.com 賣家後
                  <br />
                  即可製作委賣物件上架
                </p>
                <button
                  className="btn  btn-outline-secondary rounded-pill"
                  type="button"
                >
                  {!currentUser && (
                    <Link data-bs-toggle="modal" to="#exampleModalToggle">
                      刊登物件
                    </Link>
                  )}
                  {currentUser && <Link to="/postHouse">刊登物件</Link>}
                </button>
              </div>
            </div>
            <div className="col-sm-6  col-lg-4 py-1 py-sm-0">
              <div className="h-100 p-5 p-sm-4 border text-light rounded-3 buyer">
                <h3>
                  我要尋找物件 <i class="fa-solid fa-magnifying-glass"></i>
                </h3>
                <p>
                  可以任意瀏覽、查詢物件
                  <br /> 本網站目前僅供預約鑑賞房屋用
                </p>
                <button
                  className="btn btn-outline-light rounded-pill"
                  type="button"
                >
                  {!currentUser && (
                    <Link data-bs-toggle="modal" to="#exampleModalToggle">
                      立即預約
                    </Link>
                  )}
                  {currentUser && <Link to="/appointment ">立即預約</Link>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeComponent;
