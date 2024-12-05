import { Inject, Injectable } from '@nestjs/common';
import {
  GOOGLE_OAUTH2_PROVIDER,
  INTEGRATION_REPOSITORY,
  OAuth2Provider,
  USER_REPOSITORY,
} from 'application/contracts';
import { OAuth2RegisterInputDto } from 'application/dtos/auth.dto';
import {
  RegisterResponseDto,
  UserDto,
  UserSessionDto,
} from 'application/dtos/user.dto';
import { Integration } from 'domain/entities/integration.entity';
import { User } from 'domain/entities/user.entity';
import { IntegrationRepository } from 'domain/repositories/integration.repository';
import { UserRepository } from 'domain/repositories/user.repository';
import { AccountFactory } from 'domain/valueObjects/account';
import { Session } from 'domain/valueObjects/session';

@Injectable()
export class UserService {
  @Inject(USER_REPOSITORY)
  private readonly userRepository: UserRepository;

  @Inject(INTEGRATION_REPOSITORY)
  private readonly integrationRepository: IntegrationRepository;

  // @Inject()
  // private readonly integrationService: IntegrationService;

  @Inject(GOOGLE_OAUTH2_PROVIDER)
  private readonly googleOAuth2Provider: OAuth2Provider;

  public async logout(userId: string): Promise<void> {
    await this.userRepository.removeUserSession(userId);
  }

  public async registerWithOAuth2(
    oAuth2RegisterInputDto: OAuth2RegisterInputDto,
  ): Promise<RegisterResponseDto> {
    const userData = await this.googleOAuth2Provider.extractUserData(
      oAuth2RegisterInputDto.idToken,
    );

    let user = await this.userRepository.findUserByEmail(userData.email);
    if (user && user.account?.userExternalId === userData.id) {
      return new RegisterResponseDto({
        status: 'already-existent',
        error: new Error('An user with that email already exists'),
      });
    }

    const session = Session.instance().configureSession({
      name: userData.name,
      email: userData.email,
    });

    const account = AccountFactory.createAccount({
      type: 'oauth',
      provider: oAuth2RegisterInputDto.provider,
      userExternalId: userData.id,
    });

    user = await this.userRepository.createUser(
      User.instance({
        name: userData.name,
        email: userData.email,
        emailVerified: userData.emailVerified,
        account,
        session,
      }),
    );

    // Set up the integration record to contain the accessToken, refreshToken and the expires in
    const integration = Integration.instance({
      ...oAuth2RegisterInputDto,
      userId: user.id,
    });
    await this.integrationRepository.createIntegration(integration);

    return new RegisterResponseDto({
      status: 'ok',
      user: new UserDto(user),
    });
  }

  public async getUserSession(userId: string): Promise<UserSessionDto> {
    const session = await this.userRepository.getUserSessionByUserId(userId);

    return new UserSessionDto(userId, session);
  }
}
