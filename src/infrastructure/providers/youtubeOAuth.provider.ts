// import { Injectable } from '@nestjs/common';
// import crypto from 'crypto';
// import config from 'config';
// import {
//   ExternalUserInfo,
//   OAuthTokens,
//   OAuth2Provider,
// } from 'application/contracts';
// import { GeneratedOAuthUrlDto } from 'application/dtos/integration.dto';
// import superagent, { ResponseError } from 'superagent';

// @Injectable()
// export class YoutubeOAuthProvider implements OAuth2Provider {
//   private readonly baseGoogleUrl =
//     'https://accounts.google.com/o/oauth2/v2/auth';

//   private readonly scopes = [
//     'https://www.googleapis.com/auth/youtube.readonly',
//   ];

//   private readonly googleOAuth2ExchangeUrl =
//     'https://oauth2.googleapis.com/token';

//   private readonly clientId = config.get<string>('google.clientId');
//   private readonly clientSecret = config.get<string>('google.clientSecret');
//   private readonly redirectUri = config.get<string>('google.redirectUri');

//   public async generateAuthUrl(): Promise<GeneratedOAuthUrlDto> {
//     const url = new URL(this.baseGoogleUrl);

//     const state = this.generateRandomState();

//     url.searchParams.set('access_type', 'offline');
//     url.searchParams.set('client_id', this.clientId);
//     url.searchParams.set('redirect_uri', this.redirectUri);
//     url.searchParams.set('scope', this.scopes.join(' '));
//     url.searchParams.set('state', state);
//     url.searchParams.set('response_type', 'code');

//     return GeneratedOAuthUrlDto.instance(url.toString(), state);
//   }

//   public async exchangeAuthorizationCode(code: string): Promise<OAuthTokens> {
//     try {
//       const url = new URL(this.googleOAuth2ExchangeUrl);

//       const response = await superagent
//         .post(url)
//         .type('form')
//         .query({
//           client_id: this.clientId,
//           client_secret: this.clientSecret,
//           grant_type: 'authorization_code',
//           redirect_uri: this.redirectUri,
//         })
//         .query(`code=${code}`)
//         .http2();

//       return {
//         accessToken: response.body.access_token,
//         expiresIn: response.body.expires_in,
//         refreshToken: response.body.refresh_token,
//         scopes: response.body.scopes,
//         tokenType: response.body.token_type,
//         idToken: '',
//         userInfo: {} as ExternalUserInfo,
//       };
//     } catch (err) {
//       const errMessage = this.parseRequestError(err);

//       let reason = err instanceof Error ? err.message : err;
//       if (errMessage) {
//         reason = errMessage;
//       }

//       const errContext = {
//         message: 'Failed to exchange oauth2 code.',
//         reason,
//       };

//       throw new Error(JSON.stringify(errContext));
//     }
//   }

//   // TODO: implement refresh authentication token
//   public refreshAuthToken(): Promise<string> {
//     return new Promise(() => '');
//   }

//   /**
//    * The random string returned by this method is intended
//    * to tag the request on the front-end side.
//    */
//   private generateRandomState(): string {
//     return crypto.randomBytes(32).toString('hex');
//   }

//   private parseRequestError(err: ResponseError & any): string | undefined {
//     let errorMessage: string | undefined;

//     if (err?.response?.error) {
//       errorMessage = JSON.parse(err.response.error.text);
//     }

//     return errorMessage;
//   }
// }
