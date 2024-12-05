import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ClassAttributes } from 'utils/types';

import { v4 as uuidv4 } from 'uuid';
import { IntegrationSchema } from './integration.schema';

@Entity('playlist')
export class PlaylistSchema {
  @Column({ type: 'uuid' })
  public id: string;

  @Column()
  public title: string;

  @Column({ nullable: true })
  public description?: string;

  @Column({ nullable: true })
  public thumbnail?: string;

  @Column({ name: 'external_id' })
  public externalId: string;

  @ManyToOne(() => IntegrationSchema, (integration) => integration.playlists)
  @JoinColumn()
  public integration: IntegrationSchema;

  protected setId(): string {
    if (!this.id) {
      return uuidv4();
    }
    return this.id;
  }

  public constructor(input: ClassAttributes<PlaylistSchema>) {
    // TypeORM will try o instatiate an object for this class when the application start
    // So we need to check it before any assignment
    if (input) {
      this.id = this.setId();
      this.title = input.title;
      this.description = input.description;
      this.externalId = input.externalId;
    }
  }
}
