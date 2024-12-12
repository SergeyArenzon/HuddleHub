import {
  AfterCreate,
  AfterDelete,
  AfterUpdate,
  Entity,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { CreateUserDto } from 'src/dtos/create-user.dto';
import { v4 as uuid } from 'uuid';
import { Exclude } from 'class-transformer';

@Entity()
export class User {
  constructor(user: CreateUserDto) {
    Object.assign(this, user);
  }

  @AfterCreate()
  logCreate() {
    console.log('Created new user with id', this.id);
  }

  @AfterUpdate()
  logUpdater() {
    console.log('Update new user with id', this.id);
  }

  @AfterDelete()
  logDelete() {
    console.log('Deleted user with id', this.id);
  }

  @PrimaryKey()
  id: string = uuid();

  @Property()
  first_name: string;

  @Property()
  last_name: string;

  @Property()
  email: string;

  @Property()
  image_url: string;

  @Exclude()
  @Property({ onCreate: () => new Date() })
  created_at: Date;

  @Exclude()
  @Property({ onUpdate: () => new Date() })
  updated_at: Date;
}
