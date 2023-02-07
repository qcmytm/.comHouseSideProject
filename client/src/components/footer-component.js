import React from "react";
import { Link } from "react-router-dom";
import sni1 from "../assets/images/Sni1.png";

const FooterComponent = () => {
  return (
    <div className="navbar navbar-expand-lg navbar-light bg-light footer">
      <footer className="pt-3 container-xl">
        <img src={sni1} alt=".COM房屋" />
        <ul className="sites_map">
          <li className="li_a">網站地圖</li>
          <li>
            <Link to="/">首頁</Link>
          </li>
          <li>
            <Link to="/profile">個人頁面</Link>
          </li>
          <li>
            <Link to="/house">HOUSE物件</Link>
          </li>
          <li>
            <Link to="/postHouse">新增委賣物件</Link>
          </li>
          <li>
            <Link to="/appointment">預約鑑賞房屋</Link>
          </li>
          <li>
            {" "}
            <Link to="/search">搜尋房屋</Link>
          </li>
          <li>
            {" "}
            <Link to="/about">關於網頁</Link>
          </li>
        </ul>
        <ul className="contact">
          <li className="li_a">聯絡我們</li>
          <li>電話：02-5572xxxx</li>
          <li>傳真：02-5579xxxx</li>
          <li>信箱：service@gmail.com</li>
          <li>服務時間：週一至週日 9:00-18:00</li>
        </ul>
      </footer>
    </div>
  );
};

export default FooterComponent;
