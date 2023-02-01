import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HouseService from "../services/house.service";

const AppointmentComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const handleTakeToLogin = () => {
    navigate("/login");
  };
  let [result, setResult] = useState(null);

  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
      if (currentUser.user.role == "houseBuyer") {
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
        window.alert("預約鑑賞成功!!將重新導向到房屋頁面.");
        navigate("/house");
      })
      .catch((e) => {
        window.alert(e.response.data);
      });
  };
  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p className="fs-2">您必須先登入才能開始預約鑑賞房屋.</p>
          <button
            className="btn btn-primary btn-lg"
            onClick={handleTakeToLogin}
          >
            跳轉登入頁面
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role == "houseSeller" && (
        <div>
          <h1>只有houseBuyer才能夠預約鑑賞.</h1>
        </div>
      )}
      {currentUser &&
        currentUser.user.role == "houseBuyer" &&
        result &&
        result.length != 0 && (
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {result.map((house) => {
              return (
                <div
                  key={house._id}
                  className="card"
                  style={{ width: "21rem", margin: "0.5rem" }}
                >
                  <div className="card-body">
                    <h5 className="card-title">物件名稱:{house.title}</h5>
                    <p style={{ margin: "0.5rem 0rem" }}>{house.description}</p>
                    <img src={house.image} class="img-fluid" alt="" />
                    <img src={house.image2} class="img-fluid" alt="" />
                    <img src={house.image3} class="img-fluid" alt="" />

                    <p style={{ margin: "0.5rem 0rem" }}>
                      預約人數:{house.houseBuyerAppointment.length}人
                    </p>
                    <p style={{ margin: "0.5rem 0rem" }}>
                      物件價格:{house.price}(單位:萬元)
                    </p>
                    <p style={{ margin: "0.5rem 0rem" }}>
                      委賣業者:{house.houseSeller.username}
                      <br /> 聯繫方式:
                      {house.houseSeller.email}
                    </p>

                    <a
                      href="#"
                      id={house._id}
                      className="card-text btn btn-primary "
                      onClick={handleAppointment}
                    >
                      預約鑑賞房屋
                    </a>
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
