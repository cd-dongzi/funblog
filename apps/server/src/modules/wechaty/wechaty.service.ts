import { Injectable } from '@nestjs/common';
// import { Response } from 'express';
// import { Contact, Message, ScanStatus, WechatyBuilder, log } from 'wechaty';
// import { WechatyInterface } from 'wechaty/impls';

@Injectable()
export class WechatyService {
  // bot?: WechatyInterface;
  // constructor() {
  //   this.bot = WechatyBuilder.build({
  //     name: 'ding-dong-bot',
  //     puppet: 'wechaty-puppet-wechat',
  //     puppetOptions: {
  //       uos: true,
  //     },
  //   });
  // }
  // login(res: Response) {
  //   this.bot?.on('scan', (qrcode: string, status: ScanStatus) => {
  //     if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
  //       const qrcodeImageUrl = ['https://wechaty.js.org/qrcode/', encodeURIComponent(qrcode)].join('');
  //       log.info('StarterBot', 'onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl);
  //       res.redirect('/wechaty.html?url=' + qrcodeImageUrl);
  //       return undefined;
  //     } else {
  //       log.info('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status);
  //     }
  //   });
  //   this.bot?.on('login', (user: Contact) => {
  //     log.info('StarterBot', '%s login', user);
  //     res.send('登录成功');
  //   });
  //   this.bot
  //     ?.start()
  //     .then(() => {
  //       log.info('StarterBot', 'Starter Bot Started.');
  //     })
  //     .catch((e) => {
  //       log.error('StarterBot', e);
  //     });
  // }
  // logout(res: Response) {
  //   // res.send('out')
  //   this.bot?.on('logout', (user: Contact) => {
  //     log.info('StarterBot', '%s logout', user);
  //     res.send('退出登录');
  //     return undefined;
  //   });
  //   this.bot?.stop();
  //   console.log();
  // }
  // IsLoggedIn() {
  //   return this.bot?.isLoggedIn;
  // }
  // async say() {
  //   const contact = await this.bot?.Contact.find({ name: '文件传输助手' });
  //   console.log(111111, contact);
  //   await contact?.say('1111');
  //   // bot
  //   //   .say('1')
  //   //   .then((res) => {
  //   //     console.log(222222, res);
  //   //   })
  //   //   .catch((err) => {
  //   //     console.log(33333, err);
  //   //   });
  //   // const room = await this.bot.Room.find({ topic: 'yours-wechat-group-name' });
  //   // if (room) {
  //   //   // send a message
  //   //   await room.say('hello world');
  //   // }
  // }
  // onScan(qrcode: string, status: ScanStatus) {
  //   if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
  //     const qrcodeImageUrl = ['https://wechaty.js.org/qrcode/', encodeURIComponent(qrcode)].join('');
  //     log.info('StarterBot', 'onScan: %s(%s) - %s', ScanStatus[status], status, qrcodeImageUrl);
  //   } else {
  //     log.info('StarterBot', 'onScan: %s(%s)', ScanStatus[status], status);
  //   }
  // }
  // onLogin(user: Contact) {
  //   log.info('StarterBot', '%s login', user);
  // }
  // onLogout(user: Contact) {
  //   log.info('StarterBot', '%s logout', user);
  // }
  // async onMessage(msg: Message) {
  //   log.info('StarterBot', msg.toString());
  //   if (msg.text() === 'ding') {
  //     await msg.say('dong');
  //   }
  // }
}
