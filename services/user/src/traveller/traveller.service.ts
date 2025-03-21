import { EntityManager } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Traveller, User } from 'src/entities';

@Injectable()
export class TravellerService {
  async createWithTransaction(
    user: User,
    em: EntityManager,
  ): Promise<Traveller> {
    const traveller = new Traveller({ user });
    await em.persistAndFlush(traveller);
    return traveller;
  }
}
