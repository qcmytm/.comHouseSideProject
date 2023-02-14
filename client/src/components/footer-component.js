import React from "react";
import { Link } from "react-router-dom";
import sni1 from "../assets/images/group197.png";

const FooterComponent = () => {
  return (
    <div className="navbar navbar-expand-lg navbar-light bg-white ">
      <footer className="pt-3 container-xl footer">
        <img src={sni1} className="footerImg" alt=".COM房屋" />
        <ul className="sitesMap">
          <li className="li_top ">網站地圖</li>
          <li className="w-50">
            <Link className="sitesMap_a " to="/">
              首頁
            </Link>
          </li>
          <li className="w-50">
            <Link className="sitesMap_a " to="/profile">
              個人頁面
            </Link>
          </li>
          <li className="w-50">
            <Link className="sitesMap_a " to="/house">
              HOUSE物件
            </Link>
          </li>
          <li className="w-50">
            <Link className="sitesMap_a " to="/postHouse">
              新增委賣物件
            </Link>
          </li>
          <li className="w-50">
            <Link className="sitesMap_a " to="/appointment">
              預約鑑賞房屋
            </Link>
          </li>
          <li className="w-50">
            <Link className="sitesMap_a " to="/search">
              搜尋房屋
            </Link>
          </li>
          <li className="w-50">
            <Link className="sitesMap_a " to="/about">
              關於網頁
            </Link>
          </li>
        </ul>
        <ul className="contact">
          <li className="li_top">聯絡我們</li>
          <li className="contact_li">電話：02-5572xxxx</li>
          <li className="contact_li">傳真：02-5579xxxx</li>
          <li className="contact_li">信箱：qcmytm@gmail.com</li>
          <li className="contact_li">服務時間：週一至週日 9:00-18:00</li>
        </ul>
      </footer>
    </div>
  );
};

export default FooterComponent;
