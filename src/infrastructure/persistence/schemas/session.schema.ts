import { Session } from 'domain/valueObjects/session';
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

@Entity('sessions')
export class SessionsSchema {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ name: 'user_id', type: 'text' })
  public userId: string;

  @Column({ name: 'session_token', type: 'text' })
  public sessionToken: string;

  @Column({ type: 'timestamptz' })
  public expires: Date;

  @OneToOne(() => UsersSchema, (user) => user.session)
  @JoinColumn({ name: 'user_id' })
  public user: UsersSchema;

  protected setId(): string {
    if (!this.id) {
      return uuidv4();
    }

    return this.id;
  }

  public constructor(userId: string, input?: ClassAttributes<Session>) {
    // TypeORM will try o instatiate an object for this class when the application start
    // So we need to check it before any assignment
    if (input) {
      this.id = this.setId();
      this.userId = userId;
      this.sessionToken = input.sessionToken;
      this.expires = input.expires;
    }
  }
}
