import { ExternalProvider } from 'domain/types';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ClassAttributes } from 'utils/types';

import { v4 as uuidv4 } from 'uuid';
import { UsersSchema } from './user.schema';
import { PlaylistSchema } from './playlist.schema';

type IntegrationSchemaInstanceInput = Omit<
  ClassAttributes<IntegrationSchema>,
  'id' | 'createdAt' | 'user'
> & {
  id?: string;
};

@Entity('integration')
export class IntegrationSchema {
  @PrimaryColumn({ type: 'uuid' })
  public id: string;

  @Column({ name: 'user_id', type: 'uuid' })
  public userId: string;

  @Column({ name: 'access_token', type: 'text' })
  public accessToken: string;

  @Column({ name: 'refresh_token', type: 'text' })
  public refreshToken: string;

  @Column({ name: 'expires_at', type: 'integer' })
  public expiresAt: number;

  @Column({ type: 'text' })
  public provider: ExternalProvider;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  public updatedAt?: Date;

  @Column({ name: 'deleted_at', type: 'timestamptz', nullable: true })
  public deletedAt?: Date;

  @ManyToOne(() => UsersSchema, (user) => user.integrations)
  @JoinColumn({ name: 'user_id' })
  public user: UsersSchema;

  @OneToMany(() => PlaylistSchema, (playlist) => playlist.integration)
  public playlists?: PlaylistSchema[];

  protected setId(): string {
    if (!this.id) {
      return uuidv4();
    }

    return this.id;
  }

  public constructor(userId: string, input?: IntegrationSchemaInstanceInput) {
    if (input) {
      this.id = this.setId();
      this.userId = userId;
      this.accessToken = input.accessToken;
      this.refreshToken = input.refreshToken;
      this.expiresAt = input.expiresAt;
      this.provider = input.provider;
    }
  }
}
