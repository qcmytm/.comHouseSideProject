import React from "react";

const AboutComponent = () => {
  return (
    <div style={{ padding: "3rem" }} className="container-xl">
      <h3 style={{ padding: "1.5rem", fontSize: "2.75rem" }}>關於此網頁</h3>
      <p style={{ padding: "0 1.5rem", fontSize: "1.5rem" }}>
        此網頁為個人作品.專案製作,無商業用途
      </p>
      <p style={{ padding: "0 1.5rem", fontSize: "1.5rem" }}>
        網頁中大量引用於591房屋交易網中的素材.圖片.文稿,在此註明引用出處 <br />
      </p>
      <p style={{ padding: "0 1.5rem", fontSize: "1.5rem" }}>
        網站架構是學習於 Udemy教學平台 wilson講師 2023全端網頁課程, <br />
        經過創意改編特此註明
      </p>
    </div>
  );
};

export default AboutComponent;
