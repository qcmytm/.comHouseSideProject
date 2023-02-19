import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import HouseService from "../services/house.service";
import { useSpring, animated } from "react-spring";

const AppointmentComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [appointmentIn, setAppointmentIn] = useState(false);
  const [message, setMessage] = useState("");

  const animation = useSpring({
    opacity: appointmentIn ? 1 : 0,
    config: { duration: 300 },
  });
  useEffect(() => {
    if (currentUser) {
      if (currentUser.user.role === "houseBuyer") {
        HouseService.getAllHouse()
          .then((data) => {
            setResult(data.data);
          })
          .catch((e) => {
            console.log(e);
          });
      }
    }
  }, []);

  const handleAppointment = (e) => {
    HouseService.appointment(e.target.id)
      .then(() => {
        setAppointmentIn(true);
        setTimeout(() => {
          setAppointmentIn(false);
          navigate("/house");
        }, 2000);
      })
      .catch((e) => {
        setMessage(e.response.data);
        setAppointmentIn(true);
        setTimeout(() => {
          setAppointmentIn(false);
          setMessage("");
        }, 2000);
      });
  };
  return (
    <div className="container-xl divContainer">
      {appointmentIn && (
        <animated.div
          className={`px-3 px-lg-5 alert popup ${
            appointmentIn ? "active" : ""
          }`}
          style={animation}
        >
          {message && <div className="px-md-5">{message}</div>}
          {!message &&
            currentUser &&
            currentUser.user.role === "houseBuyer" && (
              <div className="px-md-5">
                預約鑑賞成功!!將重新導向到房屋頁面！
              </div>
            )}
        </animated.div>
      )}
      {!currentUser && (
        <div>
          <p className="fs-2">您必須先登入才能開始預約鑑賞房屋</p>
          <Link
            className="btn btn-primary btn"
            data-bs-toggle="modal"
            to="#exampleModalToggle"
          >
            跳轉登入頁面
          </Link>
        </div>
      )}
      {currentUser && currentUser.user.role === "houseSeller" && (
        <div>
          <h1>只有houseBuyer才能夠預約鑑賞</h1>
        </div>
      )}
      {currentUser &&
        currentUser.user.role === "houseBuyer" &&
        result &&
        result.length !== 0 && (
          <div className="house">
            {result.map((house) => {
              return (
                <div key={house._id} className="card house_card">
                  <div className="card-body house_card_dflex">
                    <div>
                      <h5 className="card-title">物件名稱:{house.title}</h5>
                      <p>{house.description}</p>
                      <img src={house.image} class="img-fluid" alt="房屋照片" />
                      <img
                        src={house.image2}
                        class="img-fluid"
                        alt="房屋照片"
                      />
                      <img
                        src={house.image3}
                        class="img-fluid"
                        alt="房屋照片"
                      />
                    </div>
                    <div>
                      <p>預約人數:{house.houseBuyerAppointment.length}人</p>
                      <p>物件價格:{house.price}(單位:萬元)</p>
                      <p>
                        委賣業者:{house.houseSeller.username}
                        <br /> 聯繫方式:
                        {house.houseSeller.email}
                      </p>
                      <div className="d-flex justify-content-end ">
                        <button
                          id={house._id}
                          className="card-text btn btn-primary "
                          onClick={handleAppointment}
                        >
                          預約鑑賞
                        </button>
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
export default AppointmentComponent;
