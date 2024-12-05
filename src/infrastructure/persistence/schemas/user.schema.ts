import { User } from 'domain/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClassAttributes } from 'utils/types';

import { v4 as uuidv4 } from 'uuid';
import { SessionsSchema } from './session.schema';
import { AccountSchema } from './account.schema';
import { IntegrationSchema } from './integration.schema';

@Entity('users')
export class UsersSchema {
  @PrimaryColumn({ type: 'uuid' })
  public id: string;

  @Column()
  public name: string;

  @Column()
  public email: string;

  @Column({ nullable: true })
  public image?: string;

  @Column({ name: 'email_verified', nullable: true, type: 'boolean' })
  public emailVerified?: Boolean;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', nullable: true, type: 'timestamptz' })
  public updatedAt?: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, type: 'timestamptz' })
  public deletedAt?: Date;

  @OneToOne(() => AccountSchema, (account) => account.user)
  public account?: AccountSchema;

  @OneToOne(() => SessionsSchema, (session) => session.user)
  public session?: SessionsSchema;

  @OneToMany(() => IntegrationSchema, (integration) => integration.user)
  public integrations?: IntegrationSchema[];

  protected setId(): string {
    if (!this.id) {
      return uuidv4();
    }

    return this.id;
  }

  public constructor(input?: ClassAttributes<User>) {
    // TypeORM will try o instatiate an object for this class when the application start
    // So we need to check it before any assignment
    if (input) {
      this.id = input.id || this.setId();
      this.name = input.name;
      this.email = input.email;
      this.emailVerified = input.emailVerified;
      this.createdAt = input.created || new Date();
      this.updatedAt = input.updated;
      this.deletedAt = input.deleted;
    }
  }
}
