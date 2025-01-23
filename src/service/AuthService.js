import APIService from "./APIService";
const ANONY_USER = { "status": false, "user": null }
const VALID_USER = { "status": true, "user": null }



class AuthService {
    checkToken() {
        if (this.getToken() === null) {
            return ANONY_USER;
        }
        return VALID_USER;
    }
  

    getUserInfo() {
        if (
            localStorage.getItem("userInfo") !== undefined &&
            localStorage.getItem("userInfo") !== null &&
            localStorage.getItem("userInfo") !== "undefined"
        ) {
            return JSON.parse(localStorage.getItem("userInfo"));
        }
        return null;
    }

 

    setUserInfo() {
        if (this.getUserInfo() != null) {
            let obj = JSON.parse(localStorage.getItem("userInfo"));
            localStorage.setItem("userInfo", JSON.stringify(obj));
        }
    }
    getToken() {
        return localStorage.getItem("token");
    }

    isTokenAlive() {
        if (this.getToken() === null || this.getUserInfo() === null)
            return false;
        return true;
    }
}

export default new AuthService();