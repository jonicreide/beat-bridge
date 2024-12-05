import { Injectable } from '@nestjs/common';

import { OAuthTokens } from 'application/contracts';

@Injectable()
export class IntegrationService {
  // @Inject()
  // private readonly googleOAuthClient: OAuth2Provider;

  // TODO: import integration repo

  public async createIntegrationFromToken(
    _userId: string,
    _token: OAuthTokens,
  ): Promise<void> {
    // Salvar no banco de dados
  }
}
