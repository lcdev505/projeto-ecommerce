"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthModel = void 0;
// backend/src/models/oAuthModel.ts
const pg_1 = require("pg");
class OAuthModel {
    constructor() {
        this.pool = new pg_1.Pool({ connectionString: process.env.DATABASE_URL });
    }
    async getClient(clientId, clientSecret) {
        return { id: clientId, grants: ["password", "refresh_token"] };
    }
    async saveToken(token, client, user) {
        // salve no banco os campos de token e refreshToken
        return {
            accessToken: token.accessToken,
            accessTokenExpiresAt: token.accessTokenExpiresAt,
            refreshToken: token.refreshToken,
            refreshTokenExpiresAt: token.refreshTokenExpiresAt,
            client: {
                id: client.id,
                grants: client.grants || ["password", "refresh_token"], // <-- garantir aqui também
            },
            user,
        };
    }
    async getAccessToken(accessToken) {
        // leia do banco e retorne um objeto com accessToken, expires, client e user
        return null; // stub
    }
    async getRefreshToken(refreshToken) {
        // leia do banco um registro matching o refreshToken
        // Exemplo stub:
        return {
            refreshToken,
            refreshTokenExpiresAt: new Date(Date.now() + 3600 * 1000),
            client: {
                id: "my-client-id",
                grants: ["password", "refresh_token"], // <-- importante
            },
            user: { id: "user-id" },
            scope: "read write",
        };
    }
    async revokeToken(token) {
        // marque como revogado no banco
        return true;
    }
    async getUser(username, password) {
        // autentique usuário (DB)
        return null;
    }
    async verifyScope(token, scope) {
        // cheque escopos, ou só retorne true
        return true;
    }
}
exports.OAuthModel = OAuthModel;
