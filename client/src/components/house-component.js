import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
  }, []);
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
    <div
      style={{ padding: "3rem", minHeight: "70vh" }}
      className="container-xl"
    >
      {!currentUser && (
        <div>
          <p className="fs-2">您必須先登入才能看到委賣物件house</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            回到登入頁面
          </button>
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
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {houseData.map((house) => {
            return (
              <div
                className="card"
                style={{ width: "20rem", margin: "0.5rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title">物件名稱:{house.title}</h5>
                  <p style={{ margin: "0.5rem 0rem" }}>{house.description}</p>

                  <img src={house.image} class="img-fluid" alt="" />
                  <img src={house.image2} class="img-fluid" alt="" />
                  <img src={house.image3} class="img-fluid" alt="" />
                  <p style={{ margin: "0.5rem 0rem" }}>
                    預約鑑賞人數:{house.houseBuyerAppointment.length}人
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    物件價格:{house.price}(單位:萬元)
                  </p>
                  <p style={{ margin: "0.5rem 0rem" }}>
                    委賣業者:{house.houseSeller.username} <br /> 聯繫方式:
                    {house.houseSeller.email}
                  </p>
                  <div className="d-flex justify-content-end ">
                    {currentUser && currentUser.user.role == "houseSeller" && (
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
            );
          })}
        </div>
      )}
    </div>
  );
};

export default HouseComponent;
