import { faker } from '@faker-js/faker/.';
import { Integration } from 'domain/entities/integration.entity';

export class IntegrationFixture {
  public static integrationData(
    userId: string,
    overrides?: Partial<Integration>,
  ): Integration {
    return Integration.instance({
      id: faker.string.uuid(),
      accessToken: faker.string.sample(15),
      refreshToken: faker.string.sample(10),
      provider: 'google',
      userId,
      expiresAt: faker.date.future().getTime(),
      ...overrides,
    });
  }
}
