import { UserRepository } from './user.repository';

export class UserService {
  userRepository: UserRepository;
  
  constructor() {
    this.userRepository = new UserRepository();

  }
}