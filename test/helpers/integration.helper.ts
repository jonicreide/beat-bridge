import { Integration } from 'domain/entities/integration.entity';
import { IntegrationRepositoryImpl } from 'infrastructure/persistence/repositories/integration.repository';
import { IntegrationSchema } from 'infrastructure/persistence/schemas/integration.schema';
import { DataSource } from 'typeorm';
import { IntegrationFixture } from '../fixtures/integration.fixture';

export class IntegrationHelper {
  private integrationRepository: IntegrationRepositoryImpl;

  public contructor(dataSource: DataSource) {
    this.integrationRepository = new IntegrationRepositoryImpl(dataSource);
  }

  public async createIntegration(
    userId: string,
    overrides?: Partial<Integration>,
  ): Promise<IntegrationSchema> {
    const integrationData = IntegrationFixture.integrationData(
      userId,
      overrides,
    );

    const savedIntegration =
      await this.integrationRepository.createIntegration(integrationData);

    return new IntegrationSchema(savedIntegration.userId, savedIntegration);
  }
}
