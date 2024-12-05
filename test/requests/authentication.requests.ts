import { OAuth2RegisterInputDto } from 'application/dtos/auth.dto';
import request from 'superagent';
import { NullableError, safeAsync, TNullable } from 'utils/types';

export class AuthenticationRequests {
  private static baseUrl = 'http://localhost:3000/beatbridge/v1/auth';

  public static async oAuth2RegisterUser<T = request.Response>(
    input: OAuth2RegisterInputDto,
  ): Promise<[TNullable<T>, NullableError]> {
    return safeAsync(async () => {
      return request.post(this.baseUrl + '/oauth2/register').send(input);
    });
  }
}
