import {
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Query,
  Params,
  Body,
  Ctx,
  Header,
  Req,
  Request,
  Res,
  Response,
  Session,
  Cookie,
  Controller,
  Middleware
} from '@server/decorators'
import { Context, Next } from 'koa'
import { IncomingHttpHeaders } from 'http'

const TestMiddleware = () => {
  return async (ctx: Context, next: Next) => {
    console.log('start TestMiddleware')
    await next()
    console.log('end TestMiddleware')
  }
}
const ExampleMiddleware = () => {
  return async (ctx: Context, next: Next) => {
    console.log('start ExampleMiddleware')
    await next()
    console.log('end ExampleMiddleware')
  }
}

@Middleware([TestMiddleware()])
@Controller('/test')
export class TestController {
  @Middleware([ExampleMiddleware()])
  @Get('/example')
  async getExample(
    @Ctx() ctx: Context,
    @Header() header: IncomingHttpHeaders,
    @Request() request: Request,
    @Req() req: Request,
    @Response() response: Response,
    @Res() res: Response,
    @Session() session: any,
    @Cookie('token') Cookie: any
  ) {
    console.log(ctx.response)
    return {
      ctx,
      header,
      request,
      response,
      Cookie,
      session
    }
  }
  @Get('/get/:name/:age')
  async getFn(
    @Query('id') id: string,
    @Query({ required: true }) query: any,
    @Params('name') name: string,
    @Params('age') age: string,
    @Params() params: any
  ) {
    return {
      method: 'get',
      id,
      query,
      name,
      age,
      params
    }
  }
  @Post('/post/:name/:age')
  async getPost(
    @Query('id') id: string,
    @Params('name') name: string,
    @Params('age') age: string,
    @Params() params: any,
    @Body('sex') sex: string,
    @Body('hobby', true) hobby: any,
    @Body() body: any
  ) {
    return {
      method: 'post',
      id,
      name,
      age,
      params,
      sex,
      hobby,
      body
    }
  }
  @Put('/put/:name/:age')
  async getPut(
    @Query('id') id: string,
    @Params('name') name: string,
    @Params('age') age: string,
    @Params() params: any,
    @Body('sex') sex: string,
    @Body('hobby', true) hobby: any,
    @Body() body: any
  ) {
    return {
      method: 'put',
      id,
      name,
      age,
      params,
      sex,
      hobby,
      body
    }
  }
  @Patch('/patch/:name/:age')
  async getPatch(
    @Query('id') id: string,
    @Params('name') name: string,
    @Params('age') age: string,
    @Params() params: any,
    @Body('sex') sex: string,
    @Body('hobby', true) hobby: any,
    @Body() body: any
  ) {
    return {
      method: 'patch',
      id,
      name,
      age,
      params,
      sex,
      hobby,
      body
    }
  }
  @Delete('/delete/:name/:age')
  async getDelete(
    @Query('id') id: string,
    @Params('name') name: string,
    @Params('age') age: string,
    @Params() params: any,
    @Body('sex') sex: string,
    @Body('hobby', true) hobby: any,
    @Body() body: any
  ) {
    return {
      method: 'delete',
      id,
      name,
      age,
      params,
      sex,
      hobby,
      body
    }
  }
}
