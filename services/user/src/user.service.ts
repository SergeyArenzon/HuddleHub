import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ClientProxy } from '@nestjs/microservices';
import { Guide, Traveller } from './entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: EntityRepository<User>,
    @InjectRepository(Traveller) private travellerRepository: EntityRepository<Traveller>,
    @InjectRepository(Guide) private guideRepository: EntityRepository<Guide>,
    private readonly em: EntityManager,
    @Inject('USER_SERVICE')
    private rabbitClient: ClientProxy,
  ) {}



  async createOrFind(createUserDto: CreateUserDto): Promise<User | null> {
    const user = await this.em.findOne(User, { email: createUserDto.email });
    if (user) {
      return user;
    }
    return await this.create(createUserDto);
  }

  async create(user: CreateUserDto): Promise<User> {
    const newUser = new User(user);
    // Fork a new EntityManager to avoid global context issues
    const em = this.em.fork();
    await em.persistAndFlush(newUser);
    return newUser;
  }

  findOne(id: string): Promise<User | null> {
    return this.userRepository.findOne({ id });
  }

  async findAll(query: Record<string, any> = {}): Promise<User[]> {
    return await this.userRepository.find(query);
  }

  async update(id: string, attrs: UpdateUserDto) {
    const user = await this.userRepository.findOneOrFail(id);
    wrap(user).assign(attrs);
    await this.em.flush();
    return user;
  }
  async remove(id: string): Promise<User> {
    const user = await this.userRepository.findOneOrFail(id);
    await this.em.removeAndFlush(user);
    return user;
  }
}
