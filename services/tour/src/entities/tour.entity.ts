import {
  AfterCreate,
  AfterDelete,
  AfterUpdate,
  Entity,
  Property,
} from '@mikro-orm/core';
import { BaseEntity } from './base.entity';

@Entity()
export class Tour extends BaseEntity {
  constructor(tour: Partial<Tour>) {
    super();
    Object.assign(this, tour);
  }

  @AfterCreate()
  logCreate() {
    console.log('Created new tour with id', this.id);
  }

  @AfterUpdate()
  logUpdater() {
    console.log('Updated tour with id', this.id);
  }

  @AfterDelete()
  logDelete() {
    console.log('Deleted tour with id', this.id);
  }

  @Property({ nullable: false })
  name: string;

  @Property()
  description: string;
}
