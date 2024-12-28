import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly repo: EntityRepository<User>,
    private readonly em: EntityManager,
    @Inject('USER_SERVICE')
    private rabbitClient: ClientProxy,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const newUser = new User(user);
    // Fork a new EntityManager to avoid global context issues
    const em = this.em.fork();
    await em.persistAndFlush(newUser);
    return newUser;
  }

  findOne(id: string): Promise<User | null> {
    return this.repo.findOne({ id });
  }

  async findAll(query: Record<string, any> = {}): Promise<User[]> {
    return await this.repo.find(query);
  }

  async update(id: string, attrs: UpdateUserDto) {
    const user = await this.repo.findOneOrFail(id);
    wrap(user).assign(attrs);
    await this.em.flush();
    return user;
  }
  async remove(id: string): Promise<User> {
    const user = await this.repo.findOneOrFail(id);
    await this.em.removeAndFlush(user);
    return user;
  }
}
