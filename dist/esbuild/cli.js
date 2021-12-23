#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = {exports: {}}).exports, mod), mod.exports;
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// node_modules/http-service-ts/lib/request.parser.js
var require_request_parser = __commonJS({
  "node_modules/http-service-ts/lib/request.parser.js"(exports2) {
    "use strict";
    var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve) {
          resolve(value);
        });
      }
      return new (P || (P = Promise))(function(resolve, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    Object.defineProperty(exports2, "__esModule", {value: true});
    var RequestParser2 = class {
      constructor(root, config) {
        this.root = root;
        this.hasSlash = (start, end) => end ? start.endsWith("/") || end.startsWith("/") : start.endsWith("/");
        this.config = config || {
          headers: new Headers(),
          appendSlash: false
        };
      }
      request(args) {
        return __awaiter(this, void 0, void 0, function* () {
          let url = "";
          if (this.root)
            url = this.root;
          if (this.root && args.url)
            url += this.hasSlash(this.root, args.url) ? args.url : `/${args.url}`;
          if (!this.root && args.url)
            url = args.url;
          if (this.config.appendSlash && !this.hasSlash(url))
            url += "/";
          if (args.id)
            url += this.config.appendSlash ? args.id + "/" : args.id.toString();
          if (args.params) {
            if (url.endsWith("/"))
              url = url.substring(0, url.length - 1);
            url += "?";
            for (const key in args.params)
              url += `${key}=${args.params[key]}&`;
            url = url.substring(0, url.length - 1);
          }
          const requestInit = {
            method: args.method.toUpperCase(),
            headers: args.headers || this.config.headers,
            mode: args.noCors === true ? "no-cors" : "cors"
          };
          if (args.method !== "get" && args.obj)
            requestInit.body = JSON.stringify(args.obj);
          const req = yield fetch(url, requestInit);
          return this.parse(req);
        });
      }
      parse(response) {
        return __awaiter(this, void 0, void 0, function* () {
          let p;
          const contentType = response.headers.get("content-type");
          if (contentType === "application/json")
            p = yield response.json();
          else if (contentType && contentType.startsWith("text"))
            p = yield response.text();
          else if (!contentType)
            p = null;
          else
            p = yield response.blob();
          return new Promise((resolve, reject) => response.status >= 200 && response.status < 300 ? resolve(p) : reject(p));
        });
      }
    };
    exports2.default = RequestParser2;
  }
});

// node_modules/http-service-ts/lib/service.js
var require_service = __commonJS({
  "node_modules/http-service-ts/lib/service.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {value: true});
    var request_parser_1 = require_request_parser();
    var Service2 = class extends request_parser_1.default {
      constructor(apiRoot, config) {
        super(apiRoot, config);
      }
      get() {
        return this.request({method: "get"});
      }
      getById(id) {
        return this.request({method: "get", id});
      }
      post(obj) {
        return this.request({method: "post", obj});
      }
      put(obj, id) {
        return this.request({method: "put", obj, id});
      }
      patch(obj, id) {
        return this.request({method: "patch", obj, id});
      }
      delete(id) {
        return this.request({method: "delete", id});
      }
    };
    exports2.default = Service2;
  }
});

// node_modules/http-service-ts/lib/index.js
var require_lib = __commonJS({
  "node_modules/http-service-ts/lib/index.js"(exports2) {
    "use strict";
    Object.defineProperty(exports2, "__esModule", {value: true});
    var service_1 = require_service();
    exports2.Service = service_1.default;
    var request_parser_1 = require_request_parser();
    exports2.RequestParser = request_parser_1.default;
  }
});

// src/authentication.ts
var import_http_service_ts = __toModule(require_lib());

// src/exceptions/JaiException.ts
var JaiException = class extends Error {
  constructor(errorMessage) {
    super(errorMessage);
    Object.setPrototypeOf(this, JaiException.prototype);
  }
};

// src/exceptions/authentication/MissingApiKeyException.ts
var MissingApiKeyException = class extends JaiException {
  constructor() {
    super("Your JAI key haven't been registered. Please, invoke 'authenticate' method inside an Authenticator instance to do so.");
  }
};

// src/authentication.ts
var Authenticator = class {
  constructor() {
    this.rootUrl = "https://mycelia.azure-api.net/";
    this.client = new import_http_service_ts.RequestParser();
  }
  async updateAuthKey(request) {
    this.throwExceptionIfNotAuthenticated();
  }
  throwExceptionIfNotAuthenticated() {
    if (!this.client.config.headers.has("Auth")) {
      throw new MissingApiKeyException();
    }
  }
  getAuthenticatedHttpClient() {
    return this.client;
  }
  authenticate(apiKey) {
    this.client.config.headers.delete("Auth");
    this.client.config.headers.append("Auth", apiKey);
    return this;
  }
  init() {
    console.debug("Initializing JAI Authenticator...");
    console.debug(`Endpoint:${this.rootUrl}`);
  }
};

// src/cli.ts
var authenticator = new Authenticator();
authenticator.init();
