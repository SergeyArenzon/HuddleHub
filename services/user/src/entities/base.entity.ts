import { PrimaryKey, Property, UuidType } from '@mikro-orm/core';
import { v4 as uuid } from 'uuid';
import { Exclude } from 'class-transformer';

// Generic BaseEntity with utility methods
export abstract class BaseEntity {
  @PrimaryKey()
  id: string = uuid();

  @Exclude()
  @Property({ onCreate: () => new Date() })
  created_at: Date;

  @Exclude()
  @Property({ onCreate: () => new Date(), onUpdate: () => new Date() })
  updated_at: Date;

  // Utility method for property assignment
  assign(data: Partial<this>) {
    Object.assign(this, data);
  }

  // Utility method for serialization
  toJSON() {
    const obj = { ...this };
    delete obj.created_at; // Remove excluded properties
    delete obj.updated_at;
    return obj;
  }
}
