import {urls} from "../constants/urlConstants";
import AuthService from "./AuthService";

class APIService {

    apiCall(methodType, content, type) {
        let reqURL = urls[type.trim()];
        console.log(reqURL)
        let token = ""
        token = AuthService.getToken()
        if (methodType === "POST")
            return fetch(reqURL, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },
                credentials: "omit",
                method: methodType,
                body: JSON.stringify(content)
            });
        else if (methodType === "GET") {
            return fetch(reqURL, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token
                },
                credentials: "omit",
                method: methodType
            });
        }
        else if (methodType === "POSTFORMDATA"){
            return fetch(reqURL, {
                headers: {
                    Authorization: "Bearer " + token
                },
                credentials: "omit",
                method: "POST",
                body: content
            });
        }
    }



}

export default new APIService();
