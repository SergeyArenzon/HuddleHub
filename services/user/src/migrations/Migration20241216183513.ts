import { Migration } from '@mikro-orm/migrations';

export class Migration20241216183513 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "user" ("id" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(255) not null, "image_url" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, constraint "user_pkey" primary key ("id"));`,
    );
  }
}
