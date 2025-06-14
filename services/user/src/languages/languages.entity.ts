import {
    Entity,
    PrimaryKey,
    Property,
  } from '@mikro-orm/core';
  import { BaseEntity } from '@mikro-orm/core';
  
  
  @Entity()
  export class Languages extends BaseEntity {

    @PrimaryKey()
    @Property({ length: 2, unique: true, nullable: false })
    code: string; // ISO 639-1 language code (e.g., 'en', 'es', 'fr')
    
    @Property({ nullable: false })
    name: string
  }
  