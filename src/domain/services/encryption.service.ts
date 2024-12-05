import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptionService {
  private readonly SALT_ROUNDS = 10;

  public async generateSalt(): Promise<string> {
    return bcrypt.genSalt();
  }

  public async generatePasswordHash(
    plainTextPassword: string,
  ): Promise<string> {
    return bcrypt.hash(plainTextPassword, this.SALT_ROUNDS);
  }

  public async checkPassword(
    givenPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(givenPassword, storedPassword);
  }
}
