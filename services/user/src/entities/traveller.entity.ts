import {
  AfterCreate,
  AfterDelete,
  AfterUpdate,
  Entity,
  Property,
  ManyToOne,
  UuidType,
} from '@mikro-orm/core';
import { BaseEntity } from './base.entity';
import { User } from './user.entity';

@Entity()
export class Traveller extends BaseEntity {
  constructor(traveller: Partial<Traveller>) {
    super();
    Object.assign(this, traveller);
  }

  @AfterCreate()
  logCreate() {
    console.log('Created new traveller with id', this.id);
  }

  @AfterUpdate()
  logUpdater() {
    console.log('Updated traveller with id', this.id);
  }

  @AfterDelete()
  logDelete() {
    console.log('Deleted traveller with id', this.id);
  }

  @ManyToOne(() => User)
  user: User;
}
