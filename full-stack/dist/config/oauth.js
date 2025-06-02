"use strict";
// backend/src/config/oauth.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.oauth = void 0;
const express_oauth_server_1 = __importDefault(require("express-oauth-server"));
const oAuthModel_1 = require("../models/oAuthModel");
exports.oauth = new express_oauth_server_1.default({
    model: new oAuthModel_1.OAuthModel(),
    accessTokenLifetime: 3600,
    allowBearerTokensInQueryString: true,
});
