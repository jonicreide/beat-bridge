import { Body, Controller, Post } from '@nestjs/common';
import { ApiNoContentResponse, ApiTags } from '@nestjs/swagger';
import { ExchangeAuthorizationCodeDto } from '../dtos/integration.dto';

@ApiTags('integration')
@Controller('beatbridge/v1/integration')
export class IntegrationController {
  // @Inject()
  // private readonly integrationService!: IntegrationService;

  @Post('google/exchangeAuthorizationCode')
  @ApiNoContentResponse()
  public async exchangeAuthorizationCode(
    @Body() { code }: ExchangeAuthorizationCodeDto,
  ): Promise<void> {
    console.log(code);
    // await this.integrationService.exchangeAuthorizationCode(code);
  }
}
