
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { MikroORM } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { create } from 'domain';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly orm: MikroORM,
    private readonly em: EntityManager,
  ) {
    create();
  }
}
