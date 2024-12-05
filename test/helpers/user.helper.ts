import { User } from 'domain/entities/user.entity';
import { DataSource } from 'typeorm';
import { UserAggregateFixture } from '../fixtures/user.fixture';
import { UserRepositoryImpl } from 'infrastructure/persistence/repositories/user.repository';

export class UserHelper {
  private userRepository: UserRepositoryImpl;

  public constructor(dataSource: DataSource) {
    this.userRepository = new UserRepositoryImpl(dataSource);
  }

  public async createUser(userOverrides?: Partial<User>): Promise<User> {
    const accountData = UserAggregateFixture.accountData(
      userOverrides?.account,
    );
    const sessionData = UserAggregateFixture.sessionData(
      userOverrides?.session,
    );
    const userData = UserAggregateFixture.userData({
      account: accountData,
      session: sessionData,
      ...userOverrides,
    });

    const savedUser = await this.userRepository.createUser(userData);

    return User.instance({ ...userData, id: savedUser.id });
  }
}
