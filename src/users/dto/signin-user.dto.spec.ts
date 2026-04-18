import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { SignInUserDto } from './signin-user.dto';

async function validateDto(plain: object) {
  const dto = plainToInstance(SignInUserDto, plain);
  return validate(dto);
}

describe('SignInUserDto', () => {
  describe('유효한 입력', () => {
    it('올바른 userid/password → 검증 통과', async () => {
      const errors = await validateDto({
        userid: 'admin',
        password: 'P@ssword1',
      });
      expect(errors).toHaveLength(0);
    });
  });

  describe('userid 검증', () => {
    it('userid 누락 → 오류', async () => {
      const errors = await validateDto({ password: 'P@ssword1' });
      expect(errors.some((e) => e.property === 'userid')).toBe(true);
    });

    it('userid 4자 미만 → 오류', async () => {
      const errors = await validateDto({
        userid: 'abc',
        password: 'P@ssword1',
      });
      expect(errors.some((e) => e.property === 'userid')).toBe(true);
    });

    it('userid 21자 초과 → 오류', async () => {
      const errors = await validateDto({
        userid: 'a'.repeat(21),
        password: 'P@ssword1',
      });
      expect(errors.some((e) => e.property === 'userid')).toBe(true);
    });
  });

  describe('password 검증', () => {
    it('password 누락 → 오류', async () => {
      const errors = await validateDto({ userid: 'admin' });
      expect(errors.some((e) => e.property === 'password')).toBe(true);
    });

    it('8자 미만 → 오류', async () => {
      const errors = await validateDto({ userid: 'admin', password: 'P@ss1' });
      expect(errors.some((e) => e.property === 'password')).toBe(true);
    });

    it('20자 초과 → 오류', async () => {
      const errors = await validateDto({
        userid: 'admin',
        password: 'P@ssword1' + 'a'.repeat(12),
      });
      expect(errors.some((e) => e.property === 'password')).toBe(true);
    });

    it('대문자 없음 → 오류', async () => {
      const errors = await validateDto({
        userid: 'admin',
        password: 'p@ssword1',
      });
      expect(errors.some((e) => e.property === 'password')).toBe(true);
    });

    it('숫자 없음 → 오류', async () => {
      const errors = await validateDto({
        userid: 'admin',
        password: 'P@ssword!',
      });
      expect(errors.some((e) => e.property === 'password')).toBe(true);
    });

    it('특수문자 없음 → 오류', async () => {
      const errors = await validateDto({
        userid: 'admin',
        password: 'Password1',
      });
      expect(errors.some((e) => e.property === 'password')).toBe(true);
    });

    it('대문자+숫자+특수문자 모두 포함 → 통과', async () => {
      const errors = await validateDto({
        userid: 'admin',
        password: 'Abcdef1@',
      });
      expect(errors).toHaveLength(0);
    });
  });
});
