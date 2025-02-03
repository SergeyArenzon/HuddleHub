import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Guide, User } from 'src/entities';

@Injectable()
export class GuideService {
    constructor() {}
    
    async createWithTransaction(user: User, em: EntityManager): Promise<Guide> {
        const guide = new Guide({user});
        await em.persistAndFlush(guide);
        return guide;
      }
}
