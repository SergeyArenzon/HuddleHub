import {
  AfterCreate,
  AfterDelete,
  AfterUpdate,
  Entity,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from './base.entity';

@Entity()
export class User extends BaseEntity {
  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }

  @AfterCreate()
  logCreate() {
    console.log('Created new user with id', this.id);
  }

  @AfterUpdate()
  logUpdater() {
    console.log('Updated user with id', this.id);
  }

  @AfterDelete()
  logDelete() {
    console.log('Deleted user with id', this.id);
  }

  @Property()
  first_name: string;

  @Property()
  last_name: string;

  @Property({ unique: true })
  email: string;

  @Property()
  image_url: string;
}
