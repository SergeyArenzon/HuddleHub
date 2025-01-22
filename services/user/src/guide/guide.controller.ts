import { Controller, Get, HttpCode } from '@nestjs/common';

@Controller('guide')
export class GuideController {
  @HttpCode(200)
  @Get('/')
  health() {}
}
