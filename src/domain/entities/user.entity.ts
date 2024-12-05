import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  validateSync,
} from 'class-validator';
import { Session } from 'domain/valueObjects/session';
import { Account } from 'domain/valueObjects/account';
import { ClassAttributes } from 'utils/types';

import { v4 as uuidv4 } from 'uuid';

export type UserInstanceInput = Omit<
  ClassAttributes<User>,
  'id' | 'created' | 'updated' | 'deleted' | 'emailVerified'
> &
  Partial<
    Pick<
      ClassAttributes<User>,
      'id' | 'created' | 'updated' | 'deleted' | 'emailVerified'
    >
  >;

// Aggregate
export class User {
  @IsUUID()
  public id: string;

  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsEmail()
  public email: string;

  @IsDate()
  public created: Date;

  @IsDate()
  @IsOptional()
  public updated?: Date;

  @IsDate()
  @IsOptional()
  public deleted?: Date;

  @IsDate()
  @IsOptional()
  public emailVerified?: Boolean;

  public session?: Session;

  public account?: Account;

  private constructor(input: UserInstanceInput) {
    this.name = input.name;
    this.email = input.email;
    this.id = input.id || this.generateUserId();
    this.created = input.created || new Date();
    this.updated = input.updated;
    this.deleted = input.deleted;
    this.emailVerified = input.emailVerified || undefined;

    this.account = input.account;
    this.session = input.session;

    validateSync(this);
  }

  private generateUserId(): string {
    return uuidv4();
  }

  public static instance(input: UserInstanceInput): User {
    return new User(input);
  }
}
