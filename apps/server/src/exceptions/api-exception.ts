import { HttpException } from '@nestjs/common';

// 业务状态码
export enum ResponseStatusEnum {
  SUCCESS = 0,
  ERROR = 1,
  FORBIDDEN = 401,
}

// 自定义错误处理
export class ApiException extends HttpException {
  private errCode: number;
  constructor(msg: string, errCode?: number) {
    // http状态码统一用200，业务状态码写入统一的响应格式code中

    // 权限问题一律使用401错误码
    if (errCode && errCode === 401) {
      super(msg, 200);
      this.errCode = ResponseStatusEnum.FORBIDDEN;
    } else {
      super(msg, errCode ?? 200);
      this.errCode = errCode ?? ResponseStatusEnum.ERROR;
    }
  }

  getErrCode(): number {
    return this.errCode;
  }
}
