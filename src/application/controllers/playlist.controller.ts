import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PlaylistDto, PlaylistInputDto } from '../dtos/playlist.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('playlist')
@Controller('beatbridge/v1/integration/:integrationId/playlist')
export class PlaylistController {
  @Post()
  public async syncPlaylists(
    @Body() input: PlaylistInputDto,
  ): Promise<PlaylistDto> {
    console.log(`Received request with : ${input}`);

    return new PlaylistDto();
  }

  @Get()
  public async getIntegrationPlaylists(
    @Param('integrationId') integrationId: string,
  ): Promise<PlaylistDto[]> {
    console.log(`Received request from: ${integrationId}`);

    return [new PlaylistDto()];
  }
}
