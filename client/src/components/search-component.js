import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HouseService from "../services/house.service";
import { useSpring, animated } from "react-spring";
const SearchComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [appointmentIn, setAppointmentIn] = useState(false);
  const [message, setMessage] = useState("");
  const [message2, setMessage2] = useState("");

  const animation = useSpring({
    opacity: appointmentIn ? 1 : 0,
    config: { duration: 300 },
  });
  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = (e) => {
    HouseService.getHouseByName(searchInput)
      .then((data) => {
        if (data.data.length === 0) {
          setMessage2("此物件名稱有誤，找不到相關物件(請務必填寫完整名稱搜尋)");
        } else {
          setSearchResult(data.data);
          setMessage2("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    let form = e.target.parentElement;
    form.children[0].value = "";
  };
  const handleAppointment = (e) => {
    if (currentUser && currentUser.user.role === "houseBuyer") {
      HouseService.appointment(e.target.id)
        .then(() => {
          setAppointmentIn(true);
          setTimeout(() => {
            navigate("/house");
            setAppointmentIn(false);
          }, 2500);
        })
        .catch((e) => {
          setMessage(e.response.data);
          setAppointmentIn(true);
          setTimeout(() => {
            setAppointmentIn(false);
            setSearchResult(null);
            setSearchInput("");
            setMessage("");
            navigate("/search");
          }, 2000);
        });
    } else if (!currentUser) {
      setAppointmentIn(true);
      setTimeout(() => {
        setAppointmentIn(false);
      }, 2000);
    }
  };
  return (
    <div className="container-xl divContainer searchBG">
      {message2 && (
        <div className=" alert alert-danger d-inline-block">{message2}</div>
      )}
      {currentUser && currentUser.user.role === "houseSeller" && (
        <div>
          <h1>只有houseBuyer才能夠搜尋房屋</h1>
        </div>
      )}
      {(!currentUser || currentUser.user.role === "houseBuyer") && (
        <div className="search input-group mb-3">
          <input
            type="text"
            className="form-control"
            onChange={handleChangeInput}
            placeholder="仰星殿、勝美敦美、文華匯...etc"
          />
          <button onClick={handleSearch} className="btn btn-primary">
            搜尋房屋
          </button>
        </div>
      )}

      {searchResult && searchResult.length !== 0 && (
        <div>
          {appointmentIn && (
            <animated.div
              className={`px-3 px-lg-5 alert popup ${
                appointmentIn ? "active" : ""
              }`}
              style={animation}
            >
              {message && <div className="px-md-5">{message}</div>}
              {!currentUser && (
                <div className="px-md-5"> 登入使用者後才能預約鑑賞！</div>
              )}
              {!message &&
                currentUser &&
                currentUser.user.role === "houseBuyer" && (
                  <div className="px-md-5">
                    預約鑑賞成功!!將重新導向到房屋頁面！
                  </div>
                )}
            </animated.div>
          )}
          <p>這是我們從伺服器返回的數據:</p>
          <div className="search">
            {searchResult.map((house) => {
              return (
                <div key={house._id} className="card searchHouse">
                  <div className="card-body house_card_dflex">
                    <div>
                      <h5 className="card-title">物件名稱:{house.title}</h5>
                      <p>{house.description}</p>
                      <img src={house.image} class="img-fluid" alt="" />
                      <img src={house.image2} class="img-fluid" alt="" />
                      <img src={house.image3} class="img-fluid" alt="" />
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
                          預約鑑賞房屋
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
