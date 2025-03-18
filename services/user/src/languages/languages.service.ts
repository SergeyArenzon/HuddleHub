import { Injectable } from '@nestjs/common';
import languages from './languages';

@Injectable()
export class LanguagesService {
    getLanguages = () : {code: string, name: string}[] => languages
}
