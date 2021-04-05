/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => {
    // webpackBootstrap
    /******/ "use strict";
    /******/ var __webpack_modules__ = {
        /***/ "./src/main.ts":
            /*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
            /***/ () => {
                eval(
                    '\r\nvar request = `POST /prep-mobile-bff/graphql HTTP/1.1\r\nAuthorization: Basic RlJXM3dlUXAwU2dFZm8xMjdzM0tjNWkyYVpJNDhPR3Y6Z3VUNWtzc0J4TUwza1VyVw==\r\nContent-Type: application/json\r\nHost: hub.chegg.com\r\nconnection: close\r\naccept-encoding: gzip, deflate\r\nContent-length: 176\r\n\r\n{"id":"q","operationName":"q","variables":{},\r\n"query":"mutation q{deleteDeck(id:\\"$flashcard_id\\",creatorId:\\"$creatorId\\")}"}`;\r\nfunction fixHeader(header) {\r\n    let split = header.split("-");\r\n    return split\r\n        .map((str) => {\r\n        return str.toLowerCase().charAt(0).toUpperCase() + str.slice(1);\r\n    })\r\n        .join("-");\r\n}\r\nclass HTTPRequest {\r\n    constructor(method, resource, version, headers, body) {\r\n        this.method = method;\r\n        this.resource = resource;\r\n        this.version = version;\r\n        this.headers = new Map();\r\n        this.body = body;\r\n        headers.forEach((val) => {\r\n            this.setHeader(val[0], val[1]);\r\n        });\r\n    }\r\n    static from(raw) {\r\n        let allLines = raw.replace("\\r", "").split("\\n");\r\n        let firstLine = allLines[0].split(" ");\r\n        let rawHeaders = allLines.slice(1, allLines.indexOf(""));\r\n        let method = firstLine[0];\r\n        let resource = firstLine[1];\r\n        let version = firstLine[2];\r\n        let body = allLines.slice(allLines.indexOf("") + 1).join("\\n");\r\n        let headers = rawHeaders.map((raw) => {\r\n            let split = raw.split(": ");\r\n            return [split[0], split[1]];\r\n        });\r\n        return new HTTPRequest(method, resource, version, headers, body);\r\n    }\r\n    build() {\r\n        let firstLine = `${this.method} ${this.resource} ${this.version}`;\r\n        let headers = "";\r\n        this.headers.forEach((val, key) => {\r\n            headers += `${fixHeader(key)}: ${val}\\n`;\r\n        });\r\n        return firstLine + "\\n" + headers + "\\n" + this.body;\r\n    }\r\n    denylist(...deny) {\r\n        deny.forEach((header) => {\r\n            this.removeHeader(header);\r\n        });\r\n    }\r\n    allowlist(...allow) {\r\n        this.headers.forEach((val, key) => {\r\n            if (allow.indexOf(key) == -1)\r\n                this.removeHeader(key);\r\n        });\r\n    }\r\n    // getters setters\r\n    setBasicAuth(user, password) {\r\n        var basic = `${user}:${password}`;\r\n        this.setHeader("Authorization", "Basic " + btoa(basic));\r\n    }\r\n    setHeader(key, val) {\r\n        this.headers.set(fixHeader(key), val);\r\n    }\r\n    getHeader(key) {\r\n        let value = this.headers.get(fixHeader(key));\r\n        return value ? value : "";\r\n    }\r\n    removeHeader(key) {\r\n        this.headers.delete(fixHeader(key));\r\n    }\r\n    getBody() {\r\n        return this.body;\r\n    }\r\n    setBody(data) {\r\n        this.setHeader("Content-Length", data.length.tostring());\r\n        this.body = data;\r\n    }\r\n}\r\nvar x = HTTPRequest.from(request);\r\nx.resource = "/post";\r\nx.setHeader("Host", "httpbin.org");\r\nx.setBody("hello, world!");\r\nx.setBasicAuth("wJMQdiNy9jz0Nz66IrlchS5XrYrp2AQV", "Rype6KGAaCV8XhNZ");\r\nconsole.log(x.build());\r\n\n\n//# sourceURL=webpack://http-minify/./src/main.ts?'
                );

                /***/
            }

        /******/
    }; // startup // Load entry module and return exports // This entry module can't be inlined because the eval devtool is used.
    /************************************************************************/
    /******/
    /******/ /******/ /******/ /******/ var __webpack_exports__ = {};
    /******/ __webpack_modules__["./src/main.ts"]();
    /******/
    /******/
})();
