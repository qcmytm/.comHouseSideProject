import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import HouseService from "../services/house.service";

const HouseComponent = ({ currentUser, setCurrentUser }) => {
  const [houseData, setHouseData] = useState(null);
  const [deleteHouse, setDeleteHouse] = useState(0);
  const [deleteAppointment, setDeleteAppointment] = useState(0);
  const [deleteIn, setDeleteIn] = useState(false);
  const [message, setMessage] = useState("");
  const animation = useSpring({
    opacity: deleteIn ? 1 : 0,
    config: { duration: 300 },
  });

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
        setDeleteIn(true);
        setTimeout(() => {
          setDeleteIn(false);
          setDeleteHouse(e.target.id);
        }, 2000);
      })
      .catch((e) => {
        setMessage(e.response.data);
        setDeleteIn(true);
        setTimeout(() => {
          setDeleteIn(false);
          setMessage("");
        }, 2000);
      });
  };
  const handleDeleteAppointment = (e) => {
    HouseService.deleteAppointment(e.target.id)
      .then(() => {
        setDeleteIn(true);
        setTimeout(() => {
          setDeleteIn(false);
          setDeleteAppointment(e.target.id);
        }, 2000);
      })
      .catch((e) => {
        setMessage(e.response.data);
        setDeleteIn(true);
        setTimeout(() => {
          setDeleteIn(false);
          setMessage("");
        }, 2000);
      });
  };
  return (
    <div className="container-xl divContainer">
      {deleteIn && (
        <animated.div
          className={`px-3 px-lg-5 alert popup ${deleteIn ? "active" : ""}`}
          style={animation}
        >
          {message && <div className="px-md-5">{message}</div>}
          {!message &&
            currentUser &&
            currentUser.user.role === "houseSeller" && (
              <div className="px-md-5">刪除物件成功!!將重新載入~</div>
            )}
          {!message &&
            currentUser &&
            currentUser.user.role === "houseBuyer" && (
              <div className="px-md-5">取消預約成功!!將重新載入~</div>
            )}
        </animated.div>
      )}
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
