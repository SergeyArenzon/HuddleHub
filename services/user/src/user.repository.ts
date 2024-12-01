import { readFileSync, writeFile } from 'fs';

export class UserRepository {
  async findOne(id: string) {
    let users = await readFileSync('users.json', 'utf8');
    users = JSON.parse(users);
    return users[id];
  }
  async findAll() {
    let users = await readFileSync('users.json', 'utf8');
    users = JSON.parse(users);
    return users;
  }
  async create(user: any) {
    let users = await readFileSync('users.json', 'utf8');
    users = JSON.parse(users);
    const id = Math.random().toString(36).substring(7);
    users[id] = { ...user, id };
    // @ts-ignore
    await writeFile('users.json', JSON.stringify(users));
    return users[id];
  }
}

