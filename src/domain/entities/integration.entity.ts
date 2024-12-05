import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  validateSync,
} from 'class-validator';
import { ExternalProvider } from 'domain/types';
import { ClassAttributes } from 'utils/types';

import { v4 as uuidv4 } from 'uuid';

type IntegrationInstanceInput = Omit<ClassAttributes<Integration>, 'id'> & {
  id?: string;
};

export class Integration {
  @IsUUID()
  public id: string;

  @IsString()
  @IsNotEmpty()
  public accessToken: string;

  @IsString()
  @IsNotEmpty()
  public refreshToken: string;

  @IsString()
  @IsNotEmpty()
  public userId: string;

  @IsString()
  @IsNotEmpty()
  public provider: ExternalProvider;

  // Unix time format
  @IsNumber()
  public expiresAt: number;

  private constructor(input: IntegrationInstanceInput) {
    this.id = input.id || uuidv4();
    this.accessToken = input.accessToken;
    this.refreshToken = input.refreshToken;
    this.provider = input.provider;
    this.userId = input.userId;
    this.expiresAt = input.expiresAt;
  }

  public static instance(input: IntegrationInstanceInput): Integration {
    const integration = new Integration(input);

    validateSync(integration);

    return integration;
  }

  public isAccessTokenExpired(): boolean {
    return this.expiresAt < Date.now();
  }

  public updateTokens(input: {
    accessToken: string;
    refreshToken: string;
    expiresAt: number;
  }): void {
    this.accessToken = input.accessToken;
    this.refreshToken = input.refreshToken;
    this.expiresAt = this.expiresAt;
  }
}
