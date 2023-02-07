import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HouseService from "../services/house.service";

const PostHouseComponent = (props) => {
  let { currentUser, setCurrentUser } = props;
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [image, setImage] = useState("");
  let [image2, setImage2] = useState("");
  let [image3, setImage3] = useState("");
  let [price, setPrice] = useState(0);
  let [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeDescription = (e) => {
    setDescription(e.target.value);
  };
  const handleChangeImage = (e) => {
    setImage(e.target.value);
  };
  const handleChangeImage2 = (e) => {
    setImage2(e.target.value);
  };
  const handleChangeImage3 = (e) => {
    setImage3(e.target.value);
  };
  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const postHouse = () => {
    HouseService.post(title, description, image, image2, image3, price)
      .then(() => {
        window.alert("新委賣物件已新增成功");
        navigate("/house");
      })
      .catch((error) => {
        console.log(error.response);
        setMessage(error.response.data);
      });
  };

  return (
    <div className="container-xl divContainer">
      {!currentUser && (
        <div>
          <p className="fs-2">在新增委託物件之前，您必須先登入</p>
          <button className="btn btn-primary btn" onClick={handleTakeToLogin}>
            跳轉登入頁面
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role !== "houseSeller" && (
        <div>
          <p className="fs-2">只有houseSeller可以新增委託物件。</p>
        </div>
      )}
      {currentUser && currentUser.user.role == "houseSeller" && (
        <div className="form-group">
          {message && (
            <div className="alert alert-warning" role="alert">
              {message}
            </div>
          )}
          <label for="exampleforTitle">物件標題：</label>
          <input
            name="title"
            type="text"
            className="form-control"
            id="exampleforTitle"
            onChange={handleChangeTitle}
          />
          <br />
          <label for="exampleforContent">物件內容：</label>
          <textarea
            className="form-control"
            id="exampleforContent"
            aria-describedby="emailHelp"
            name="content"
            onChange={handleChangeDescription}
          />

          <br />
          <label for="exampleforImage">物件圖片：</label>
          <textarea
            className="form-control"
            id="exampleforImage"
            name="image"
            placeholder="此處請填第一張圖片URL"
            onChange={handleChangeImage}
          />

          <textarea
            className="form-control"
            id="exampleforImage"
            name="image2"
            placeholder="此處請填第二張圖片URL"
            onChange={handleChangeImage2}
          />

          <textarea
            className="form-control"
            id="exampleforImage"
            name="image3"
            placeholder="此處請填第三張圖片URL"
            onChange={handleChangeImage3}
          />

          <br />
          <label for="exampleforPrice">物件價格(單位:萬元)：</label>
          <input
            name="price"
            type="number"
            className="form-control"
            id="exampleforPrice"
            onChange={handleChangePrice}
          />

          <br />
          <button className="btn btn-primary" onClick={postHouse}>
            新增物件
          </button>
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

export default PostHouseComponent;
