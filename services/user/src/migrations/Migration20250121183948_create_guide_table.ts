import { Migration } from '@mikro-orm/migrations';

export class Migration20250121183948_create_guide_table extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "guide" ("id" varchar(255) not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "user_id" varchar(255) not null, constraint "guide_pkey" primary key ("id"));`,
    );

    this.addSql(
      `alter table "guide" add constraint "guide_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "guide" cascade;`);
  }
}
