import { Session } from 'domain/valueObjects/session';
import { User } from '../entities/user.entity';

export interface UserRepository {
  createUser(user: User): Promise<User>;
  findUserByEmail(userEmail: string): Promise<User | undefined>;
  userExists(userEmail: string): Promise<boolean>;
  saveUserSession(userId: string, session: Session): Promise<Session>;
  removeUserSession(userId: string): Promise<void>;
  getUserSessionByUserId(userId: string): Promise<Session>;
}
