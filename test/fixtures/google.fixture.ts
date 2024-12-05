import { faker } from '@faker-js/faker/.';
import { ExternalUserInfo } from 'application/contracts';
import { OAuth2RegisterInputDto } from 'application/dtos/auth.dto';
import jwt from 'jsonwebtoken';

export class GoogleFixture {
  public static getExchangedGoogleToken = (
    overrides?: Partial<OAuth2RegisterInputDto>,
  ): OAuth2RegisterInputDto => {
    return {
      accessToken: 'ya29.a0AfH6SMCzylT3FJ7P6gGhT9u5hFw6-kXjBqAq',
      expiresAt: 1712458561,
      refreshToken: '1//04i0N7F_HRZCI9O',
      scopes:
        'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.readonly',
      tokenType: 'bearer',
      idToken:
        'eyJhbGciOiJSUzI1NiIsImtpZCI6IjFkYzBmMTcyZThkNmVmMzgyZDZkM2EyMzFmNmMxOTdkZDY4Y2U1ZWYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI2ODU0MDMzMTg1ODUtaTM2dWtkbzQ4MmtmNmVmc3VwczNxODBocTIyOGxkOWwuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI2ODU0MDMzMTg1ODUtaTM2dWtkbzQ4MmtmNmVmc3VwczNxODBocTIyOGxkOWwuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTY5MTQ4NzIyOTU1NDgzNjEwMTYiLCJlbWFpbCI6InZpbmRyYWRlYW5kcmFkZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjdiU1p4U0NJREZwNU1rQXRXdi1HYkEiLCJuYW1lIjoiTWF0aGV1cyBWaW7DrWNpdXMgQW5kcmFkZSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMU3dvVjF5cnNINzZRM2VlV09pNzhxVk5GQkdGT1E2aEN4UXBGVmYzOUlyRFY4ZmtwZj1zOTYtYyIsImdpdmVuX25hbWUiOiJNYXRoZXVzIFZpbsOtY2l1cyIsImZhbWlseV9uYW1lIjoiQW5kcmFkZSIsImlhdCI6MTczMTk4MDYwNCwiZXhwIjoxNzMxOTg0MjA0fQ.OJHCDxoFfeH1cQLSQogMlC0T1uW7Lac31xC-LGeOt0JXPnsOYrM6XzqBq4xtN38zCy3NAjdASSZhZC2elnNHJxIIVWudCMM9XUuaXNbPnQRvSEdMe4x01c7WE5PUW3GqKCOOToXYxM5_CVY7hwidBH1DrQOd_p-bdhC8ryE5vhfJdoibBPpQMDYxJXWqytRxLvSbvtvljp26nmEMntWOkcds8qlOKYb9j6GbPQ2HsDdtd9fsXPmqkciwRy4q2yVPSs4LW7epmRnqK8WaZ-PRWxNUDuxl-GWinFij2NDPqeazRW0ohdgSdATgJOUfjZErKrfno7ZeexYxfNCqGUu0jw',
      provider: 'google',
      ...overrides,
    };
  };

  public static createIdTokenwWithUserData(
    userData: Pick<ExternalUserInfo, 'email' | 'name' | 'id' | 'image'>,
  ): string {
    return jwt.sign(
      {
        email: userData.email,
        name: userData.name,
        sub: userData.id,
        image: userData.image,
      },
      'fake-secret-key',
      { expiresIn: '1h' },
    );
  }

  public static getUserData(
    overrides?: Partial<ExternalUserInfo>,
  ): ExternalUserInfo {
    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      emailVerified: faker.datatype.boolean(),
      image: faker.image.avatar(),
      ...overrides,
    };
  }
}
