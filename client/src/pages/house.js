import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import HouseService from "../services/house.service";

const HouseComponent = ({ currentUser, setCurrentUser }) => {
  let navigate = useNavigate();

  const handleTakeToLogin = () => {
    navigate("/login");
  };
  let [houseData, setHouseData] = useState(null);
  let [deleteHouse, setDeleteHouse] = useState(0);
  let [deleteAppointment, setDeleteAppointment] = useState(0);

  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role == "houseSeller") {
        HouseService.getSellerID(_id)
          .then((data) => {
            setHouseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      } else if (currentUser.user.role == "houseBuyer") {
        HouseService.getHouseBuyerAppointment(_id)
          .then((data) => {
            setHouseData(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, [deleteHouse, deleteAppointment]);
  const handleDelete = (e) => {
    HouseService.deleteObject(e.target.id)
      .then(() => {
        window.alert("刪除物件成功!!將重新載入~");
        setDeleteHouse(e.target.id);
      })
      .catch((e) => {
        window.alert(e.response.data);
      });
  };
  const handleDeleteAppointment = (e) => {
    HouseService.deleteAppointment(e.target.id)
      .then(() => {
        window.alert("取消預約成功!!將重新載入~");
        setDeleteAppointment(e.target.id);
      })
      .catch((e) => {
        window.alert(e.response.data);
      });
  };
  return (
    <div className="container-xl divContainer">
      {!currentUser && (
        <div>
          <p className="fs-2">您必須先登入才能看到委賣物件house</p>
          <Link
            className="btn btn-primary btn"
            data-bs-toggle="modal"
            to="#exampleModalToggle"
          >
            跳轉登入頁面
          </Link>
        </div>
      )}
      {currentUser && currentUser.user.role == "houseSeller" && (
        <div>
          <h1>歡迎來到houseSeller的委賣物件頁面</h1>
        </div>
      )}
      {currentUser && currentUser.user.role == "houseBuyer" && (
        <div>
          <h1>歡迎來到houseBuyer的預約鑑賞頁面</h1>
        </div>
      )}
      {currentUser && houseData && houseData.length != 0 && (
        <div className="house">
          {houseData.map((house) => {
            return (
              <div className="card house_card">
                <div className="card-body house_card_dflex">
                  <div>
                    <h5 className="card-title">物件名稱:{house.title}</h5>
                    <p>{house.description}</p>

                    <img src={house.image} class="img-fluid" alt="" />
                    <img src={house.image2} class="img-fluid" alt="" />
                    <img src={house.image3} class="img-fluid" alt="" />
                  </div>
                  <div>
                    <p>預約鑑賞人數:{house.houseBuyerAppointment.length}人</p>
                    <p>物件價格:{house.price}(單位:萬元)</p>
                    <p>
                      委賣業者:{house.houseSeller.username} <br /> 聯繫方式:
                      {house.houseSeller.email}
                    </p>

                    <div className="d-flex justify-content-end ">
                      {currentUser &&
                        currentUser.user.role == "houseSeller" && (
                          <button
                            id={house._id}
                            className="card-text btn-sm btn-primary "
                            onClick={handleDelete}
                          >
                            刪除物件
                          </button>
                        )}
                      {currentUser && currentUser.user.role == "houseBuyer" && (
                        <button
                          id={house._id}
                          className="card-text btn-sm btn-primary "
                          onClick={handleDeleteAppointment}
                        >
                          取消預約
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HouseComponent;
