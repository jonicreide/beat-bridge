import {
  IsNotEmpty,
  IsOptional,
  IsString,
  validateSync,
} from 'class-validator';
import { ClassAttributes } from 'utils/types';

export type Type = 'oauth' | 'credentials';
export type Provider = 'google' | 'spotify';

export abstract class Account {
  @IsString()
  @IsNotEmpty()
  public type: Type;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public provider?: Provider;

  // userExternalId represents the 'sub' field on JWT token
  @IsString()
  @IsNotEmpty()
  public userExternalId: string;

  public constructor(input: ClassAttributes<Account>) {
    this.type = input.type;
    this.provider = input.provider;
    this.userExternalId = input.userExternalId;
  }
}

export class OAuthAccount extends Account {
  public constructor(input: Account) {
    super(input);
    validateSync(this);
  }
}

export class AccountFactory {
  public static createAccount(input: Account): Account {
    if (input.type === 'oauth') {
      // input validation will be done within the OAuthAccount constructor
      // no need to panic with TS type checking here.
      return new OAuthAccount(input);
    }

    throw new Error('Unable to determine an account type');
  }
}
