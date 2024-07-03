import { getJwtToken, getRefreshToken, getJwtAuthInfo } from "@app/utility";

class TokenService {
  public async generateToken(userExists: any) {
    const authInfo = await getJwtAuthInfo(userExists);
    const refreshToken = await getRefreshToken(authInfo);

    const token = await getJwtToken(authInfo);
    return { token, refreshToken };
  }
}

export default new TokenService();
