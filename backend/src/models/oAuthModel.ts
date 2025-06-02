// backend/src/models/oAuthModel.ts
import { Pool } from "pg";
import { Token, Scope, RefreshToken } from "oauth2-server";

export class OAuthModel {
  private pool = new Pool({ connectionString: process.env.DATABASE_URL });

  async getClient(clientId: string, clientSecret: string) {
    return { id: clientId, grants: ["password", "refresh_token"] };
  }

  async saveToken(token: Token & { refreshToken?: string; refreshTokenExpiresAt?: Date }, client: any, user: any) {
    // salve no banco os campos de token e refreshToken
    return {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.accessTokenExpiresAt,
      refreshToken: token.refreshToken!,
      refreshTokenExpiresAt: token.refreshTokenExpiresAt!,
      client: {
        id: client.id,
        grants: client.grants || ["password", "refresh_token"], // <-- garantir aqui também
      },
      user,
    };
  }

  async getAccessToken(accessToken: string) {
    // leia do banco e retorne um objeto com accessToken, expires, client e user
    return null; // stub
  }

  async getRefreshToken(refreshToken: string): Promise<RefreshToken | false> {
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

  async revokeToken(token: RefreshToken): Promise<boolean> {
    // marque como revogado no banco
    return true;
  }

  async getUser(username: string, password: string) {
    // autentique usuário (DB)
    return null;
  }

  async verifyScope(token: Token, scope: Scope): Promise<boolean> {
    // cheque escopos, ou só retorne true
    return true;
  }
}
