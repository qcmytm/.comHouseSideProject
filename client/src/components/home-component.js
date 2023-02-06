import React from "react";
import { Link } from "react-router-dom";
import SlideComponent from "./slide-component";

const HomeComponent = () => {
  return (
    <main >
      <SlideComponent />
      <div className="container-xl py-4">
        <div className="p-5 mb-4 bg-light rounded-3">
          <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">.COM房屋</h1>

            <h3></h3>
            <p className="col-md-8 fs-4">
              透過.COM輕鬆找到目標客群 <br />
              .COM利用網站自身的強大流量資源與用戶資源，將您的物件即時地展現在有需求的用戶面前
              <br />
              獲得更多潛在客戶的關注，產生更多的火花，最終達成交易。
            </p>
          </div>
        </div>

        <div className="row align-items-md-stretch">
          <div className="col-md-6">
            <div
              className="h-100 p-5 text-white rounded-3"
              style={{ background: "rgb(32 103 174)" }}
            >
              <h2>成為HouseBuyer用戶</h2>
              <p>
                可以任意瀏覽、查詢他們喜歡的房屋物件。
                <br />
                本網站目前僅供預約鑑賞房屋用，請勿提供任何個人資料，例如信用卡號碼。
              </p>
              <button className="btn  btn-outline-secondary" type="button">
                <Link
                  style={{ textDecoration: "none", color: "white" }}
                  to="/register"
                >
                  登錄會員或註冊一個帳號
                </Link>
              </button>
            </div>
          </div>
          <div className="col-md-6">
            <div
              className="h-100 p-5 border rounded-3"
              style={{ background: "rgb(244 151 31)" }}
            >
              <h2>成為HouseSeller用戶</h2>
              <p>
                您可以註冊認證成為一位Seller，並開始詳細製作委賣物件上架。
                <br />
                本網站提供優質物件大量的曝光機會,但請勿圖文不符、惡意照騙欺瞞Buyer。
              </p>
              <button className="btn btn-outline-light" type="button">
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to="/register"
                >
                  立即開始上架委賣物件
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomeComponent;
