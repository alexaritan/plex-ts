"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _serverIp, _serverPort;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlexClient = void 0;
const node_fetch_1 = __importDefault(require("node-fetch"));
const xml2js_1 = require("xml2js");
const types_1 = require("./types");
class PlexClient {
    constructor(options) {
        _serverIp.set(this, void 0);
        _serverPort.set(this, void 0);
        __classPrivateFieldSet(this, _serverIp, options.serverIp);
        __classPrivateFieldSet(this, _serverPort, options.serverPort);
    }
    getBaseServerCapabilities() {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                url: `${this.getServerUrl()}`
            };
            const xml = yield this._request(options);
            console.log(xml);
            return xml;
        });
    }
    getLibrarySections() {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                url: `${this.getServerUrl()}/library/sections`
            };
            const xml = yield this._request(options);
            return xml;
        });
    }
    getServerUrl() {
        const url = __classPrivateFieldGet(this, _serverIp);
        return __classPrivateFieldGet(this, _serverPort) === undefined ? url : `${url}:${__classPrivateFieldGet(this, _serverPort)}`;
    }
    _request(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options.method)
                options.method = types_1.METHOD.GET;
            const rawxml = yield node_fetch_1.default(options.url, options).then(res => res.text());
            const xml = yield xml2js_1.parseStringPromise(rawxml);
            return xml;
        });
    }
}
exports.PlexClient = PlexClient;
_serverIp = new WeakMap(), _serverPort = new WeakMap();
