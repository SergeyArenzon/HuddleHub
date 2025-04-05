import { Controller, Get, HttpCode } from '@nestjs/common';
import { LanguagesService } from './languages.service';

@Controller('languages')
export class LanguagesController {
  constructor(private languagesService: LanguagesService) {}

  @Get()
  @HttpCode(200)  // Set the HTTP status code to 200
  getLanguages(): {code: string, name: string}[] {
    return this.languagesService.getLanguages();
  }
}
