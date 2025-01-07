import {
  AfterCreate,
  AfterDelete,
  AfterUpdate,
  Entity,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { Exclude } from 'class-transformer';

// Base entity to handle timestamps
class BaseEntity {
  @PrimaryKey()
  id: string = uuid();

  @Exclude()
  @Property({ onCreate: () => new Date() })
  created_at: Date;

  @Exclude()
  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updated_at: Date;
}

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

  @Property()
  email: string;

  @Property()
  image_url: string;
}
