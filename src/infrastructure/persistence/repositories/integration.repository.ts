import { Inject, Injectable } from '@nestjs/common';
import { Integration } from 'domain/entities/integration.entity';
import { IntegrationRepository } from 'domain/repositories/integration.repository';
import { DataSource } from 'typeorm';
import { IntegrationSchema } from '../schemas/integration.schema';

@Injectable()
export class IntegrationRepositoryImpl implements IntegrationRepository {
  public constructor(
    @Inject(DataSource)
    private readonly dataSource: DataSource,
  ) {}

  public async createIntegration(
    integration: Integration,
  ): Promise<Integration> {
    await this.dataSource.manager.save(
      new IntegrationSchema(integration.userId, integration),
    );

    return integration;
  }
}
