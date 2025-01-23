import { APIService } from "../service";
import Alert from '@mui/material/Alert';
import React from 'react';
import { commons } from ".";

let commonFunc = {};

const response = {
    status: "failure",
    message: ""
};
commonFunc.errorLog = e => {
    console.log(e);
};
commonFunc.detectInternet = () => {
    return !navigator.onLine ? <Alert severity="warning" elevation={6}
        variant="filled" >No Internet Connection!</Alert> : ''
}
commonFunc.redirectHome = () => {
    localStorage.clear();
    window.location.href = "/";
};
commonFunc.genericRes = () => {
    const obj = response;

    return obj;
};


commonFunc.getAPIRes = (params, type, api, props) => {
    let res = commonFunc.genericRes();

    try {
        if (!navigator.onLine) {
            return res;
        }

        return new Promise((resolve, reject) => {
            APIService.apiCall(type, params, api)
                .then(res => {
                    // if (res.status === 401 || res.status === 440) {
                    //     commonFunc.redirectHome();
                    // }
                    return res.json();
                })
                .then(res => {
                    resolve(res);
                })
                .catch(error => {
                    commons.errorLog(error)
                    resolve(res);
                });
        });
    } catch (e) {
        commons.errorLog(exports)
        return res;
    }
};
commonFunc.downloadPdf = (data) => {
    try {
        console.log("entered pdf download")
        const byteCharacters = atob(data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        console.log(byteNumbers)

        var byteArray = new Uint8Array(byteNumbers);
        console.log(byteArray)

        var file = new Blob([byteArray], { type: 'application/pdf;base64' });
        var fileURL = URL.createObjectURL(file);
        console.log("fileURL " + fileURL)

        window.open(fileURL);
    } catch (e) {
        console.log(e)
    }
}

export { commonFunc };
