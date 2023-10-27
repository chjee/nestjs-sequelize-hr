import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      userid: 'admin',
      username: 'john',
      password: 'whoami',
    },
    {
      userid: 'chjee',
      username: 'andrew',
      password: 'guess',
    },
  ];

  async findOne(userid: string): Promise<User | undefined> {
    return this.users.find((user) => user.userid === userid);
  }
}
