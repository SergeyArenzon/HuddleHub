import { Migration } from '@mikro-orm/migrations';

export class Migration20250422174950 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "category" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "name" varchar(255) not null, "description" varchar(255) not null, constraint "category_pkey" primary key ("id"));`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "category" cascade;`);
  }
}
