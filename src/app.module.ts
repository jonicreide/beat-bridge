import { Module } from '@nestjs/common';
import { PlaylistController } from './application/controllers/playlist.controller';
import { IntegrationController } from './application/controllers/integration.controller';
import { IntegrationService } from './application/services/integration.service';
import { UserController } from 'application/controllers/user.controller';
import { AuthController } from 'application/controllers/auth.controller';
import { UserService } from 'application/services/user.service';
import { PersistenceModule } from 'infrastructure/persistence/persistence.module';
import { RepositoriesModule } from 'infrastructure/persistence/repositories/repositories.module';
import { EncryptionService } from 'domain/services/encryption.service';
import { GoogleOAuthProvider } from 'infrastructure/providers/googleOAuth.provider';
import { GOOGLE_OAUTH2_PROVIDER } from 'application/contracts';

@Module({
  imports: [PersistenceModule, RepositoriesModule],
  controllers: [
    AuthController,
    PlaylistController,
    IntegrationController,
    UserController,
  ],
  providers: [
    IntegrationService,
    UserService,
    EncryptionService,
    { provide: GOOGLE_OAUTH2_PROVIDER, useClass: GoogleOAuthProvider },
  ],
})
export class AppModule {}
