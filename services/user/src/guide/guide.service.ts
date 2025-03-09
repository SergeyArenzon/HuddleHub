import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { CreateGuideDto, ResponseGuideDto } from 'src/dtos/guide.dto';
import { Guide, User } from 'src/entities';
import { UserService } from 'src/app.service';

@Injectable()
export class GuideService {
    constructor(
      @InjectRepository(Guide) private guideRepository: EntityRepository<Guide>,
      private readonly userService: UserService,
      private readonly em: EntityManager,
    ) {}
    
    async create(createGuideDto: CreateGuideDto): Promise<ResponseGuideDto> {
        const user = await this.em.findOne(User, { id: createGuideDto.user_id });
        console.log({user});
        
        // Start a new transaction with EntityManager
        const em = this.em.fork();
        // Create a new User entity
        const newGuide = new Guide({...createGuideDto, user});
        console.log({newGuide});
        
        // Persist the user in the transaction
        await em.persistAndFlush(newGuide);
        // Create the Guide associated with the user inside the same transaction
        // Commit the transaction
        await em.flush();
        return newGuide;
      }
}
