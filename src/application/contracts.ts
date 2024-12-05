export const USER_REPOSITORY = Symbol('UserRepository');
export const INTEGRATION_REPOSITORY = Symbol('IntegrationRepository');

export const TOKEN_VALIDATOR = Symbol('TokenValidator');
export const GOOGLE_OAUTH2_PROVIDER = Symbol('GoogleOAuth2Provider');
export const SPOTIFY_OAUTH2_PROVIDER = Symbol('SpotifyOAuth2Provider');

export interface OAuth2Provider {
  // generateAuthUrl: () => Promise<{ state: string; url: string }>;
  refreshAuthToken: (refreshToken: string) => Promise<string>;
  exchangeAuthorizationCode: (code: string) => Promise<OAuthTokens>;
  extractUserData(idToken: string): Promise<ExternalUserInfo>;
}

export interface ExternalUserInfo {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string;
}

export interface OAuthTokens {
  accessToken: string;
  expiresAt?: number;
  refreshToken: string;
  scopes?: string;
  tokenType?: string;
  idToken: string;
  provider?: string;
}
