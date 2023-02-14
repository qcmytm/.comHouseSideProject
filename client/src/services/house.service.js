import axios from "axios";
const API_URL = "https://com-house.onrender.com/api/houses";

class HouseService {
  post(title, description, image, image2, image3, price) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL,
      { title, description, image, image2, image3, price },
      {
        headers: { Authorization: token },
      }
    );
  }
  //使用houseBuyer id來尋找預約鑑賞中的 house
  getHouseBuyerAppointment(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/houseBuyer/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  //使用houseSeller id來尋找  此id正委賣的所有house
  getSellerID(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/houseSeller/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
  getAllHouse() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/", {
      headers: {
        Authorization: token,
      },
    });
  }

  //用house名稱尋找 委賣物件 house
  getHouseByName(name) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/findByName/" + name, {
      headers: {
        Authorization: token,
      },
    });
  }
  //預約鑑賞
  appointment(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "/appointment/" + _id,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
  //取消預約deleteAppointment
  deleteAppointment(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "/deleteAppointment/" + _id,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  deleteObject(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.delete(API_URL + "/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }
}

export default new HouseService();
