"use strict";

/***************************************************
 *  A Collectorclass for several useful functions
 *
 *  KWM, 2022-03-28
 ***************************************************/

export default class KWM_Utils {

    static isEmpty(variable) {
        if (Array.isArray(variable))
            return (variable.length === 0);
        else if (typeof variable === "object")
            return (Object.entries(variable).length === 0 && variable.constructor === Object);
        else
            return (typeof variable === "undefined" || variable == null || variable === "");
    }

    static getOS() {
        let device = "Unknown Device";
        if (navigator.appVersion.indexOf("Win") != -1) device = "Windows";
        if (navigator.appVersion.indexOf("Mac") != -1) device = "MacOS"; //iPad Pro & iPhone 6 :)
        if (navigator.appVersion.indexOf("Android") != -1) device = "Android";
        if (navigator.appVersion.indexOf("iOS") != -1) device = "iOS";
        return device;
    }

    static getOS() {
        return navigator.userAgentData ? navigator.userAgentData.platform : navigator.platform;
    }

    static clientIsMobile() {
        return navigator.userAgentData.mobile || /Mobi|Android/i.test(navigator.userAgent);
    }

    static clientIsTouch() {
        return 'ontouchstart' in document.documentElement;
    }

    static clientHasCamera() {
        navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);
        navigator.getMedia({video: true}, function (stream) {
            stream.getTracks().forEach(function (track) {
                track.stop();
            });
            return true;
        }, function () {
            return false;
        });
    }

    static getIndexOfObjectInArrayByPropertyValue(array, property, value) {
        return array.map(obj => obj[property]).indexOf(value);
    }

    static getGetParameters() {
        const hash = location.hash;
        const index = hash.indexOf("?");
        const params = hash.slice(index + 1)
            .split('&')
            .map(param => {
                const paramPair = param.split('=');
                return [paramPair[0], paramPair[1]]
            });
        if (index !== -1) return {"params": Object.fromEntries(params)};
        return {};
    }

    static getGetParams() {
        // const url = new URL(window.location.href);
        const url = new URL(window.location.hash);
        console.log(url);
        const params = new URLSearchParams(url.search);
        const paramMap = new Map();
        for (let pair of params.entries()) paramMap.set(pair[0], pair[1]);
        return paramMap;
    }

    static async apiRequest(url, config = {}) {
        return fetch(url, config)
            .then((response) => {
                if (!response.ok) {
                    console.error(response.statusText + ' at ' + url);
                    console.error(config);
                }
                return response.json();
            })
            .then((data) => data);
    }

    static async apiGET(url, headers = KWM_Utils.authHeader()) {
        return KWM_Utils.apiRequest(kwm.conf.apiRoot + url,
            {
                method: 'GET',
                headers: headers
            });
    }

    static async apiPOST(url, headers = {}, body = {}){
        return KWM_Utils.apiRequest(kwm.conf.apiRoot + url,
            {
                method: 'POST',
                headers: headers,
                body: body}
        );
    }

    static authHeader() {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + localStorage.token);
        return myHeaders;
    }
}
