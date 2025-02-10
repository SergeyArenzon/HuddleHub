import { ClientProxy } from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository, wrap } from '@mikro-orm/postgresql';
import { User } from './entities';
import { CreateUserDto, ResponseUserDto, UpdateUserDto, UserDto } from './dtos';
import { GuideService } from './guide/guide.service';
import { TravellerService } from './traveller/traveller.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
    @Inject('USER_SERVICE')
    private rabbitClient: ClientProxy,
    private readonly guideService: GuideService,
    private readonly travellerService: TravellerService,
  ) {}

  async createOrFind(createUserDto: CreateUserDto): Promise<UserDto | null> {
    const user = await this.em.findOne(User, { email: createUserDto.email });
    if (user) {
      return user;
    }
    return await this.create(createUserDto);
  }

  async create(createUserDto: CreateUserDto): Promise<ResponseUserDto> {
    // Start a new transaction with EntityManager
    const em = this.em.fork();
    // Create a new User entity
    const newUser = new User(createUserDto);
    // Persist the user in the transaction
    await em.persistAndFlush(newUser);
    // Create the Guide associated with the user inside the same transaction
    await this.guideService.createWithTransaction(newUser, em);
    await this.travellerService.createWithTransaction(newUser, em);
    // Commit the transaction
    await em.flush();
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
