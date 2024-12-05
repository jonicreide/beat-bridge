import { Module } from '@nestjs/common';
import { UserRepositoryImpl } from './user.repository';
import { INTEGRATION_REPOSITORY, USER_REPOSITORY } from 'application/contracts';
import { IntegrationRepositoryImpl } from './integration.repository';

const userRepositoryProvider = {
  provide: USER_REPOSITORY,
  useClass: UserRepositoryImpl,
};

const integrationRepositoryProvider = {
  provide: INTEGRATION_REPOSITORY,
  useClass: IntegrationRepositoryImpl,
};

@Module({
  providers: [userRepositoryProvider, integrationRepositoryProvider],
  exports: [userRepositoryProvider, integrationRepositoryProvider],
})
export class RepositoriesModule {}
