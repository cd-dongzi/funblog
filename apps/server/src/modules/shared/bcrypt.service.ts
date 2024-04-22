import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  /**
   * 用于哈希密码的盐
   */
  private static SALT_ROUNDS = 10;
  /**
   * 生成 hash
   * @param { string } rawStr 要加密的数据
   * @param { string } salt 用于哈希密码的盐。如果指定为数字，则将使用指定的轮数生成盐并将其使用。推荐 10
   */
  async hash(rawStr: string, salt?: string) {
    return bcrypt.hashSync(rawStr, salt || BcryptService.SALT_ROUNDS);
  }

  /**
   * 对比检查密码
   * @param { string } rawStr 要比较的原始数据
   * @param { string } hashedStr 要比较的数据, 加密过的数据
   */
  async compare(rawStr: string, hashedStr: string) {
    return bcrypt.compareSync(rawStr, hashedStr);
  }
}
