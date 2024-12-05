import { User } from 'domain/entities/user.entity';

import { faker } from '@faker-js/faker';
import { Account, AccountFactory } from 'domain/valueObjects/account';
import { Session } from 'domain/valueObjects/session';

export class UserAggregateFixture {
  public static userData(userOverrides?: Partial<User>): User {
    return User.instance({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      created: faker.date.past(),
      emailVerified: faker.datatype.boolean(),
      ...userOverrides,
    });
  }

  public static accountData(accountOverrides?: Account): Account {
    return AccountFactory.createAccount({
      type: 'oauth',
      provider: 'google',
      userExternalId: faker.string.uuid(),
      ...accountOverrides,
    });
  }

  public static sessionData(sessionOverrides?: Session): Session {
    return Session.instance({
      sessionToken: faker.string.sample(10),
      expires: faker.date.future(),
      ...sessionOverrides,
    });
  }
}
