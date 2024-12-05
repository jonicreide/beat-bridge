import { Module } from '@nestjs/common';
import { DatabaseModule } from 'infrastructure/providers/database.module';

@Module({
  imports: [
    DatabaseModule.register({
      host: 'localhost',
      port: 5432,
      database: 'beat_bridge',
      username: 'postgres',
      password: 'postgres',
      poolSize: 2,
      ssl: false,
    }),
  ],
})
export class PersistenceModule {}
