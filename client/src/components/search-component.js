import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HouseService from "../services/house.service";
const SearchComponent = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);

  const handleChangeInput = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearch = (e) => {
    HouseService.getHouseByName(searchInput)
      .then((data) => {
        if (data.data.length === 0) {
          window.alert(
            "此物件名稱有誤，找不到相關物件(請務必填寫完整名稱搜尋)"
          );
        } else {
          setSearchResult(data.data);
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
          window.alert("預約鑑賞成功!!將重新導向到房屋頁面.");
          navigate("/house");
        })
        .catch((e) => {
          window.alert(e.response.data);
          setSearchResult(null);
          setSearchInput("");
          navigate("/search");
        });
    } else if (currentUser && currentUser.user.role === "houseSeller") {
      window.alert("只有HouseBuyer才能預約鑑賞");
    } else if (!currentUser) {
      window.alert("登入使用者後才能預約鑑賞");
    }
  };
  return (
    <div className="container-xl divContainer">
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
