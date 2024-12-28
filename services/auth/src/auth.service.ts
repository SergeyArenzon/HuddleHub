import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE')
    private rabbitClient: ClientProxy,
  ) {}

  async createUser(user: any) {
    console.log("send");
    
    this.rabbitClient.emit('user_create', user);
  }

  // async findOne(id: string):  {}

  // async findAll(query: Record<string, any> = {}) {}

  // async update(id: string, attrs: UpdateUserDto) {}
  // async remove(id: string): {}
}
