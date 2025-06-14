import {
  AfterCreate,
  AfterDelete,
  AfterUpdate,
  Entity,
  OneToOne,
} from '@mikro-orm/core';
import { BaseEntity } from '../entities/base.entity';
import { User } from '../entities'; 

@Entity()
export class Guide extends BaseEntity {
  constructor(guide: Partial<Guide>) {
    super();
    Object.assign(this, guide);
  }

  @AfterCreate()
  logCreate() {
    console.log('Created new guide with id', this.id);
  }

  @AfterUpdate()
  logUpdater() {
    console.log('Updated guide with id', this.id);
  }

  @AfterDelete()
  logDelete() {
    console.log('Deleted guide with id', this.id);
  }

  @OneToOne(() => User)
  user!: User;
}
