import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';

@Entity()
export class User {
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

  @Property({ onCreate: () => new Date() })
  created_at: Date;

  @Property({ onUpdate: () => new Date() })
  updated_at: Date;
}
