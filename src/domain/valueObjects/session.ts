import { addDays, isPast } from 'date-fns';
import jwt from 'jsonwebtoken';
import { ClassAttributes } from 'utils/types';

export class Session {
  public sessionToken: string;

  public expires: Date;

  // TODO: get from env var
  private secretKey = 'fake-secret-key';

  private readonly DAYS_TO_EXPIRES = 2;

  private constructor(input?: ClassAttributes<Session>) {
    if (input) {
      this.sessionToken = input.sessionToken;
      this.expires = input.expires;
    }
  }

  public expired(): boolean {
    return isPast(this.expires);
  }

  private generateToken(input: { email: string; name: string }): string {
    const sessionToken = jwt.sign(
      {
        name: input.name,
        email: input.email,
      },
      this.secretKey,
      { expiresIn: `${this.DAYS_TO_EXPIRES}d` },
    );

    this.sessionToken = sessionToken;

    return sessionToken;
  }

  public configureSession(input: { email: string; name: string }): Session {
    if (!this.sessionToken || this.expired()) {
      this.sessionToken = this.generateToken(input);
      this.expires = addDays(new Date(), this.DAYS_TO_EXPIRES);
    }

    return this;
  }

  public static instance(input?: ClassAttributes<Session>): Session {
    return new Session(input);
  }
}
