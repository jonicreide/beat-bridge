import { Inject, Injectable } from '@nestjs/common';
import { User } from 'domain/entities/user.entity';
import { UserRepository } from 'domain/repositories/user.repository';
import { DataSource } from 'typeorm';
import { UsersSchema } from '../schemas/user.schema';
import { AccountSchema } from '../schemas/account.schema';
import { SessionsSchema } from '../schemas/session.schema';
import { AccountFactory } from 'domain/valueObjects/account';
import { Session } from 'domain/valueObjects/session';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(@Inject(DataSource) private readonly dataSource: DataSource) {}

  public async createUser(user: User): Promise<User> {
    try {
      await this.dataSource.transaction(async (manager) => {
        const savedUser = await manager.save(new UsersSchema(user));

        await manager.save(new AccountSchema(savedUser.id, user.account!));

        await manager.save(new SessionsSchema(savedUser.id, user.session!));
      });
    } catch (err) {
      if (err instanceof Error) {
        console.log(`Unable to save an user: ${err.message}`);
        console.log(`Stack: ${err.stack}`);
      }
    }

    return user;
  }

  public async findUserByEmail(userEmail: string): Promise<User | undefined> {
    const user = await this.dataSource.manager.findOne(UsersSchema, {
      relations: ['account', 'session'],
      where: {
        email: userEmail,
      },
    });

    if (!user) return;

    return User.instance({
      id: user.id,
      name: user.name,
      email: user.email,
      emailVerified: user.emailVerified,
      account: AccountFactory.createAccount({ ...user.account! }),
      session: Session.instance({ ...user.session! }),
    });
  }

  public async userExists(userEmail: string): Promise<boolean> {
    return this.dataSource.manager.exists(UsersSchema, {
      where: {
        email: userEmail,
      },
    });
  }

  public async saveUserSession(
    userId: string,
    session: Session,
  ): Promise<Session> {
    await this.dataSource.manager.insert(SessionsSchema, {
      userId,
      sessionToken: session.sessionToken,
      expires: session.expires,
    });

    return session;
  }

  public async removeUserSession(userId: string): Promise<void> {
    await this.dataSource.manager.delete(SessionsSchema, {
      userId,
    });
  }

  public async getUserSessionByUserId(userId: string): Promise<Session> {
    const userSession = await this.dataSource.manager.findOneByOrFail(
      SessionsSchema,
      {
        userId,
      },
    );

    return Session.instance(userSession);
  }
}
