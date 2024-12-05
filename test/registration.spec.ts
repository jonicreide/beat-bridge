import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from 'application/controllers/auth.controller';
import { DatabaseModule } from 'infrastructure/providers/database.module';
import { DbHelper } from './helpers/db.helper';
import { UsersSchema } from 'infrastructure/persistence/schemas/user.schema';
import { SessionsSchema } from 'infrastructure/persistence/schemas/session.schema';
import { AccountSchema } from 'infrastructure/persistence/schemas/account.schema';
import { UserService } from 'application/services/user.service';
import { IntegrationService } from 'application/services/integration.service';
import { EncryptionService } from 'domain/services/encryption.service';
import { RepositoriesModule } from 'infrastructure/persistence/repositories/repositories.module';
import { GoogleFixture } from './fixtures/google.fixture';
import { INestApplication } from '@nestjs/common';
import { GoogleOAuthProvider } from 'infrastructure/providers/googleOAuth.provider';
import { GOOGLE_OAUTH2_PROVIDER, OAuth2Provider } from 'application/contracts';
import { AuthenticationRequests } from './requests/authentication.requests';
import { IntegrationSchema } from 'infrastructure/persistence/schemas/integration.schema';
import { UserHelper } from './helpers/user.helper';
import { DataSource } from 'typeorm';

describe('Registration Tests', () => {
  let app: INestApplication;
  let moduleRef: TestingModule;
  let dbHelper: DbHelper;
  let userHelper: UserHelper;
  let dataSource: DataSource;

  let googleOAuth2Provider: OAuth2Provider;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        DatabaseModule.register({
          port: 65432,
        }),
        RepositoriesModule,
      ],
      controllers: [AuthController],
      providers: [
        {
          provide: GOOGLE_OAUTH2_PROVIDER,
          useClass: GoogleOAuthProvider,
        },
        UserService,
        IntegrationService,
        EncryptionService,
      ],
    }).compile();

    dbHelper = DbHelper.instance(moduleRef);
    app = moduleRef.createNestApplication();
    googleOAuth2Provider = moduleRef.get(GOOGLE_OAUTH2_PROVIDER);
    dataSource = moduleRef.get(DataSource);

    userHelper = new UserHelper(dataSource);

    await app.listen(3000);
  });

  beforeEach(async () => {
    await dbHelper.trucate([
      UsersSchema,
      SessionsSchema,
      AccountSchema,
      IntegrationSchema,
    ]);
  });

  afterAll(async () => {
    await app?.close();
    await dbHelper?.onTestEnds();
  });

  it('should register an user when receiving data from Google OAuth2 provider', async () => {
    // Given
    const input = GoogleFixture.getExchangedGoogleToken();

    jest
      .spyOn(googleOAuth2Provider, 'extractUserData')
      .mockResolvedValue(GoogleFixture.getUserData());

    // When
    const [response, err] =
      await AuthenticationRequests.oAuth2RegisterUser(input);

    // Then
    expect(response).toBeTruthy();
    expect(err).toBeFalsy();
  });

  it('should return error when trying to register an existent user', async () => {
    // Given
    const userData = GoogleFixture.getUserData();
    const idToken = GoogleFixture.createIdTokenwWithUserData(userData);

    const user = await userHelper.createUser({
      email: userData.email,
      account: { userExternalId: userData.id, type: 'oauth' },
    });

    const input = GoogleFixture.getExchangedGoogleToken({
      idToken,
    });

    jest
      .spyOn(googleOAuth2Provider, 'extractUserData')
      .mockResolvedValue(userData);

    // When
    const [response, err] =
      await AuthenticationRequests.oAuth2RegisterUser(input);

    // Then
    const userIntegration = await dataSource.manager.findOneBy(
      IntegrationSchema,
      {
        userId: user.id,
      },
    );

    expect(userIntegration).toBeFalsy();
    expect(response).toBeDefined();
    expect(err).toBeFalsy();
  });
});
