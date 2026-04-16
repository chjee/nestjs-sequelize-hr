import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
  // 임시 샘플 계정 — DB 전환(3차 PR) 전까지만 사용
  // 비밀번호: admin → admin1234, chjee → chjee1234 (기존 평문 계정 폐기)
  private readonly users: User[] = [
    {
      userid: 'admin',
      username: 'john',
      password: '$2b$10$BhcYrujTe9oKvRQotsRCEujdEd3yVwQwkFpFLvgYo6TOsGxQc4IYu',
    },
    {
      userid: 'chjee',
      username: 'andrew',
      password: '$2b$10$i6WSYSNlDcwsWBWodCuDZeyF1Pb0g7yjW44iUwHYQ99UQnmOAYlUO',
    },
  ];

  async findOne(userid: string): Promise<User | undefined> {
    return this.users.find((user) => user.userid === userid);
  }
}
