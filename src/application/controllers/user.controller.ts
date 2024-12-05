import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('beatbridge/v1/user')
export class UserController {
  @Delete('/:userEmail')
  public async deleteUserAccount(
    @Param('userEmail') userEmail: string,
  ): Promise<void> {
    console.log(userEmail);
  }
}
