import { DynamicModule, Global, Module } from '@nestjs/common';
import { AccountSchema } from 'infrastructure/persistence/schemas/account.schema';
import { IntegrationSchema } from 'infrastructure/persistence/schemas/integration.schema';
import { PlaylistSchema } from 'infrastructure/persistence/schemas/playlist.schema';
import { SessionsSchema } from 'infrastructure/persistence/schemas/session.schema';
import { UsersSchema } from 'infrastructure/persistence/schemas/user.schema';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export type DatabaseConfiguration = Omit<PostgresConnectionOptions, 'type'> & {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  poolSize?: number;
  ssl?: boolean;
  type?: string;
};

@Global()
@Module({})
export class DatabaseModule {
  public static async register(
    config?: Partial<DatabaseConfiguration>,
  ): Promise<DynamicModule> {
    let dbConfig = this.getDbConfig(config);

    const dbProvider = {
      provide: DataSource,
      useFactory: async () => {
        const dataSource = new DataSource({
          ...dbConfig,
          type: 'postgres',
          entities: [
            AccountSchema,
            SessionsSchema,
            UsersSchema,
            IntegrationSchema,
            PlaylistSchema,
          ],
        });

        return dataSource.initialize();
      },
    };

    return {
      module: DatabaseModule,
      providers: [dbProvider],
      exports: [dbProvider],
    };
  }

  private static getDbConfig(
    config?: Partial<DatabaseConfiguration>,
  ): DatabaseConfiguration {
    return {
      host: 'localhost',
      port: 5432,
      database: 'beat_bridge',
      username: 'postgres',
      password: 'postgres',
      type: 'postgres',
      poolSize: 4,
      ssl: false,
      ...config,
    };
  }
}
