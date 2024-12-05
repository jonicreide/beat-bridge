import { OAuthAccount, Provider, Type } from 'domain/valueObjects/account';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClassAttributes } from 'utils/types';

import { v4 as uuidv4 } from 'uuid';
import { UsersSchema } from './user.schema';

@Entity('accounts')
export class AccountSchema {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  public userId: string;

  @Column({ name: 'user_external_id', type: 'text' })
  public userExternalId: string;

  @Column({ nullable: true })
  public type: Type;

  @Column({ nullable: true, type: 'text' })
  public provider?: Provider;

  @OneToOne(() => UsersSchema, (user) => user.account)
  @JoinColumn({ name: 'user_id' })
  public user: UsersSchema;

  protected setId(): string {
    if (!this.id) {
      return uuidv4();
    }

    return this.id;
  }

  public constructor(userId: string, input: ClassAttributes<OAuthAccount>) {
    // TypeORM will try o instatiate an object for this class when the application start
    // So we need to check it before any assignment
    if (input) {
      this.id = this.setId();
      this.userId = userId;
      this.type = input.type;
      this.userExternalId = input.userExternalId;
      this.provider = input.provider;
    }
  }
}
