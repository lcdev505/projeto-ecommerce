// backend/src/config/oauth.ts

import OAuthServer from "express-oauth-server";
import { OAuthModel } from "../models/oAuthModel";

export const oauth = new OAuthServer({
  model: new OAuthModel(),
  accessTokenLifetime: 3600,
  allowBearerTokensInQueryString: true,
});
