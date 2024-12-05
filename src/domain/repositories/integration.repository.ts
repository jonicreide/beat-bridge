import { Integration } from 'domain/entities/integration.entity';

export interface IntegrationRepository {
  createIntegration: (integration: Integration) => Promise<Integration>;
  // getIntegrations: () => Promise<void>;
  // disableIntegration: () => Promise<void>;
  // deleteIntegration: () => Promise<void>;
}
