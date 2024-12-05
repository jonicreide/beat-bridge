import { Injectable } from '@nestjs/common';
import {
  ExternalUserInfo,
  OAuthTokens,
  OAuth2Provider,
} from 'application/contracts';
import { OAuth2Client, TokenPayload } from 'google-auth-library';

@Injectable()
export class GoogleOAuthProvider implements OAuth2Provider {
  private readonly CLIENT_ID = '';
  private readonly CLIENT_SECRET = '';
  private readonly REDIRECT_URI = '';

  private readonly googleOAuthClient: OAuth2Client;

  public constructor() {
    this.googleOAuthClient = new OAuth2Client(
      this.CLIENT_ID,
      this.CLIENT_SECRET,
      this.REDIRECT_URI,
    );
  }

  public async extractUserData(token: string): Promise<ExternalUserInfo> {
    const ticket = await this.googleOAuthClient.verifyIdToken({
      idToken: token,
      audience: this.CLIENT_ID,
    });

    const userPayload = ticket.getPayload();
    if (
      !userPayload ||
      (userPayload && !this.isUserPayloadDataValid(userPayload))
    ) {
      throw new Error(`The received JWT is not a valid one`);
    }

    return this.extractUserDataFromJWT(userPayload);
  }

  public async refreshAuthToken(refreshToken: string): Promise<string> {
    this.googleOAuthClient.setCredentials({
      refresh_token: refreshToken,
    });

    const { token, res } = await this.googleOAuthClient.getAccessToken();
    if (!token) {
      throw new Error(`Unable to refresh the access token. ${res?.data}`);
    }

    return token;
  }

  public async exchangeAuthorizationCode(code: string): Promise<OAuthTokens> {
    try {
      const { tokens } = await this.googleOAuthClient.getToken(code);

      if (!tokens) {
        throw new Error('Empty tokens received from Google');
      }

      return {
        refreshToken: tokens.refresh_token!,
        accessToken: tokens.access_token!,
        expiresAt: tokens.expiry_date!,
        idToken: tokens.id_token!,
        scopes: tokens.scope!,
        tokenType: tokens.token_type!,
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  private isUserPayloadDataValid(payload: TokenPayload): boolean {
    const requiredFilledKeys = ['name', 'email', 'sub', 'email_verified'];

    for (let requiredFilledKey of requiredFilledKeys) {
      if (!payload[requiredFilledKey]) {
        return false;
      }
    }

    return true;
  }
  private extractUserDataFromJWT(payload: TokenPayload): ExternalUserInfo {
    return {
      id: payload.sub,
      name: payload.name!,
      email: payload.email!,
      image: payload.picture,
      emailVerified: payload.email_verified!,
    };
  }
}
