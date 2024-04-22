import fs from 'fs';
import path from 'path';
import { PageMenuType, Tag } from '@funblog/types';
import { Injectable } from '@nestjs/common';
import { SERVER_PORT } from 'src/constants';
import { PrismaService } from '../prisma/prisma.service';
import { SiteConfigType } from '../site/site.interface';

@Injectable()
export class InitService {
  constructor(private readonly prisma: PrismaService) {}

  async initData() {
    const svg = await this.prisma.prisma.svg.findFirst();
    const arr = [] as any[];
    if (!svg) {
      arr.push(this.initSvg());
    }
    // ================== 站点配置 ==================
    // 站点信息
    const siteMeta = await this.prisma.prisma.siteConfig.findFirst({
      where: {
        type: SiteConfigType.META,
      },
    });
    if (!siteMeta) {
      arr.push(this.initSiteMeta());
    }
    // 博主信息
    const siteBlogger = await this.prisma.prisma.siteConfig.findFirst({
      where: {
        type: SiteConfigType.BLOGGER,
      },
    });
    if (!siteBlogger) {
      arr.push(this.initSiteBlogger());
    }
    // 分页信息
    const sitePagination = await this.prisma.prisma.siteConfig.findFirst({
      where: {
        type: SiteConfigType.PAGINATION,
      },
    });
    if (!sitePagination) {
      arr.push(this.initSitePagination());
    }
    // 评论信息
    const siteComment = await this.prisma.prisma.siteConfig.findFirst({
      where: {
        type: SiteConfigType.COMMENT,
      },
    });
    if (!siteComment) {
      arr.push(this.initSiteComment());
    }
    // 媒体设置
    const siteMedia = await this.prisma.prisma.siteConfig.findFirst({
      where: {
        type: SiteConfigType.IMAGE,
      },
    });
    if (!siteMedia) {
      arr.push(this.initSiteMedia());
    }
    // 用户设置
    const siteUser = await this.prisma.prisma.siteConfig.findFirst({
      where: {
        type: SiteConfigType.USER,
      },
    });
    if (!siteUser) {
      arr.push(this.initSiteUser());
    }
    // 高级设置
    const siteAdvance = await this.prisma.prisma.siteConfig.findFirst({
      where: {
        type: SiteConfigType.ADVANCE,
      },
    });
    if (!siteAdvance) {
      arr.push(this.initSiteAdvance());
    }

    // ================== 页面配置 ==================
    const pageMenu = await this.prisma.prisma.pageMenu.findFirst();
    if (!pageMenu) {
      arr.push(this.initPageMenu());
    }

    const post = await this.prisma.prisma.post.findFirst();
    if (!post) {
      const tag = await this.prisma.prisma.tag.create({
        data: {
          name: '测试',
          alias: 'test',
        },
      });
      arr.push(this.initPost(tag as any));
    }

    await this.prisma.prisma.$transaction(arr);
  }

  initSvg() {
    const _p = path.resolve(process.cwd(), './assets/svg.json');
    const data = fs.readFileSync(_p, 'utf-8').toString();
    const list = JSON.parse(data);
    return this.prisma.prisma.svg.createMany({
      data: list.map((item) => {
        return {
          name: item.name,
          content: item.content,
          scope: item.scope,
          desc: item.desc,
        };
      }),
    });
  }

  initSiteMeta() {
    return this.prisma.prisma.siteConfig.create({
      data: {
        type: SiteConfigType.META,
        config: {
          title: 'Funblog',
          keywords: 'Next, Nest, React, TypeScript',
          description: 'Funblog',
          favicon: '/favicon.ico',
          logo: '/logo.png',
          url: `http://localhost:${process.env.CLIENT_PORT}`,
          resourceUrl: `http://localhost:${SERVER_PORT}`,
          serverUrl: `http://localhost:${SERVER_PORT}`,
          adminUrl: `http://localhost:${process.env.ADMIN_PORT}`,
          footerLinks: [
            { text: '版权所有 © 2021 •̀.̫•́✧ | Wintermelon All Rights Reserved' },
            { text: '京ICP备xxxxxxxx-1', url: 'https://baidu.com' },
          ],
        },
      },
    });
  }

  initSiteBlogger() {
    return this.prisma.prisma.siteConfig.create({
      data: {
        type: SiteConfigType.BLOGGER,
        config: {
          avatar: '/avatar.gif',
          username: 'funblog',
          desc: 'have fun',
        },
      },
    });
  }

  initSitePagination() {
    return this.prisma.prisma.siteConfig.create({
      data: {
        type: SiteConfigType.PAGINATION,
        config: {
          postPageSize: 12,
        },
      },
    });
  }

  initSiteComment() {
    return this.prisma.prisma.siteConfig.create({
      data: {
        type: SiteConfigType.COMMENT,
        config: {
          pageSize: 10,
          enableComment: true,
          viewOnly: false,
          review: true,
          approvedPass: true,
          notifyAfterComment: true,
          emailAfterApproval: true,
          emailAfterReply: true,
          emojiList: [
            {
              name: '表情',
              value:
                '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 😗 😙 😚 ☺️ 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾',
            },
            {
              name: '手势',
              value: '👍 👎 🤲 👐 🙌 👏 🤝 👊 ✊ 🤛 🤜 🤞 ✌️ 🤟 🤘 👌 👈 👉 👆 👇 ☝️ ✋ 🤚 🖖 👋 🤙 💪 🖕 ✍️ 🙏',
            },
            {
              name: '人物',
              value:
                '👶 👧 🧒 👦 👩 🧑 👨 👵 🧓 👴 👲 👳‍♀️ 👳‍♂️ 🧕 🧔 👱‍♂️ 👱‍♀️ 👮‍♀️ 👮‍♂️ 👷‍♀️ 👷‍♂️ 💂‍♀️ 💂‍♂️ 🕵️‍♀️ 🕵️‍♂️ 👩‍⚕️ 👨‍⚕️ 👩‍🌾 👨‍🌾 👩‍🍳 👨‍🍳 👩‍🎓 👨‍🎓 👩‍🎤 👨‍🎤 👩‍🏫 👨‍🏫 👩‍🏭 👨‍🏭 👩‍💻 👨‍💻 👩‍💼 👨‍💼 👩‍🔧 👨‍🔧 👩‍🔬 👨‍🔬 👩‍🎨 👨‍🎨 👩‍🚒 👨‍🚒 👩‍✈️ 👨‍✈️ 👩‍🚀 👨‍🚀 👩‍⚖️ 👨‍⚖️ 👰 🤵 👸 🤴 🤶 🎅 🧙‍♀️ 🧙‍♂️ 🧝‍♀️ 🧝‍♂️ 🧛‍♀️ 🧛‍♂️ 🧟‍♀️ 🧟‍♂️ 🧞‍♀️ 🧞‍♂️ 🧜‍♀️ 🧜‍♂️ 🧚‍♀️ 🧚‍♂️ 👼 🤰 🤱 🙇‍♀️ 🙇‍♂️ 💁‍♀️ 💁‍♂️ 🙅‍♀️ 🙅‍♂️ 🙆‍♀️ 🙆‍♂️ 🙋‍♀️ 🙋‍♂️ 🤦‍♀️ 🤦‍♂️ 🤷‍♀️ 🤷‍♂️ 🙎‍♀️ 🙎‍♂️ 🙍‍♀️ 🙍‍♂️ 💇‍♀️ 💇‍♂️ 💆‍♀️ 💆‍♂️ 🧖‍♀️ 🧖‍♂️ 💅 🤳 💃 🕺 👯‍♀️ 👯‍♂️ 🕴 🚶‍♀️ 🚶‍♂️ 🏃‍♀️ 🏃‍♂️ 👫 👭 👬 💑 👩‍❤️‍👩 👨‍❤️‍👨 💏 👩‍❤️‍💋‍👩 👨‍❤️‍💋‍👨 👪',
            },
            {
              name: '动物&自然',
              value:
                '🐶 🐱 🐭 🐹 🐰 🦊 🦝 🐻 🐼 🦘 🦡 🐨 🐯 🦁 🐮 🐷 🐽 🐸 🐵 🙈 🙉 🙊 🐒 🐔 🐧 🐦 🐤 🐣 🐥 🦆 🦢 🦅 🦉 🦚 🦜 🦇 🐺 🐗 🐴 🦄 🐝 🐛 🦋 🐌 🐚 🐞 🐜 🦗 🕷 🕸 🦂 🦟 🦠 🐢 🐍 🦎 🦖 🦕 🐙 🦑 🦐 🦀 🐡 🐠 🐟 🐬 🐳 🐋 🦈 🐊 🐅 🐆 🦓 🦍 🐘 🦏 🦛 🐪 🐫 🦙 🦒 🐃 🐂 🐄 🐎 🐖 🐏 🐑 🐐 🦌 🐕 🐩 🐈 🐓 🦃 🐇 🐁 🐀 🦔 🐾 🐉 🐲 🌵 🎄 🌲 🌳 🌴 🌱 🌿 ☘️ 🍀 🎍 🎋 🍃 🍂 🍁 🍄 🌾 💐 🌷 🌹 🥀 🌺 🌸 🌼 🌻 🌞 🌝 🌛 🌜 🌚 🌕 🌖 🌗 🌘 🌑 🌒 🌓 🌔 🌙 🌎 🌍 🌏 💫 ⭐️ 🌟 ✨ ⚡️ ☄️ 💥 🔥 🌈 ☀️ ⛅️ ❄️ ☃️ ⛄️ 💨 💧 💦 ☔️ ☂️ 🌊',
            },
            {
              name: '水果&食物',
              value:
                '🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🍈 🍒 🍑 🍍 🥭 🥥 🥝 🍅 🍆 🥑 🥦 🥒 🥬 🌽 🥕 🥔 🍠 🥐 🍞 🥖 🥨 🥯 🧀 🥚 🍳 🥞 🥓 🥩 🍗 🍖 🌭 🍔 🍟 🍕 🥪 🥙 🌮 🌯 🥗 🥘 🥫 🍝 🍜 🍲 🍛 🍣 🍱 🥟 🍤 🍙 🍚 🍘 🍥 🥮 🥠 🍢 🍡 🍧 🍨 🍦 🥧 🍰 🎂 🍮 🍭 🍬 🍫 🍿 🧂 🍩 🍪 🌰 🥜 🍯 🥛 🍼 ☕️ 🍵 🥤 🍶 🍺 🍻 🥂 🍷 🥃 🍸 🍹 🍾 🥄 🍴 🍽 🥣 🥡 🥢',
            },
            {
              name: '运动&娱乐',
              value:
                '⚽️ 🏀 🏈 ⚾️ 🥎 🏐 🏉 🎾 🥏 🎱 🏓 🏸 🥅 🏒 🏑 🥍 🏏 ⛳️ 🏹 🎣 🥊 🥋 🎽 ⛸ 🥌 🛷 🛹 🎿 ⛷ 🏂 🏋️‍♀️ 🏋🏻‍♀️ 🏋🏼‍♀️ 🏋🏽‍♀️ 🏋🏾‍♀️ 🏋🏿‍♀️ 🏋️‍♂️ 🏋🏻‍♂️ 🏋🏼‍♂️ 🏋🏽‍♂️ 🏋🏾‍♂️ 🏋🏿‍♂️ 🤼‍♀️ 🤼‍♂️ 🤸‍♀️ 🤸🏻‍♀️ 🤸🏼‍♀️ 🤸🏽‍♀️ 🤸🏾‍♀️ 🤸🏿‍♀️ 🤸‍♂️ 🤸🏻‍♂️ 🤸🏼‍♂️ 🤸🏽‍♂️ 🤸🏾‍♂️ 🤸🏿‍♂️ ⛹️‍♀️ ⛹🏻‍♀️ ⛹🏼‍♀️ ⛹🏽‍♀️ ⛹🏾‍♀️ ⛹🏿‍♀️ ⛹️‍♂️ ⛹🏻‍♂️ ⛹🏼‍♂️ ⛹🏽‍♂️ ⛹🏾‍♂️ ⛹🏿‍♂️ 🤺 🤾‍♀️ 🤾🏻‍♀️ 🤾🏼‍♀️ 🤾🏾‍♀️ 🤾🏾‍♀️ 🤾🏿‍♀️ 🤾‍♂️ 🤾🏻‍♂️ 🤾🏼‍♂️ 🤾🏽‍♂️ 🤾🏾‍♂️ 🤾🏿‍♂️ 🏌️‍♀️ 🏌🏻‍♀️ 🏌🏼‍♀️ 🏌🏽‍♀️ 🏌🏾‍♀️ 🏌🏿‍♀️ 🏌️‍♂️ 🏌🏻‍♂️ 🏌🏼‍♂️ 🏌🏽‍♂️ 🏌🏾‍♂️ 🏌🏿‍♂️ 🏇 🏇🏻 🏇🏼 🏇🏽 🏇🏾 🏇🏿 🧘‍♀️ 🧘🏻‍♀️ 🧘🏼‍♀️ 🧘🏽‍♀️ 🧘🏾‍♀️ 🧘🏿‍♀️ 🧘‍♂️ 🧘🏻‍♂️ 🧘🏼‍♂️ 🧘🏽‍♂️ 🧘🏾‍♂️ 🧘🏿‍♂️ 🏄‍♀️ 🏄🏻‍♀️ 🏄🏼‍♀️ 🏄🏽‍♀️ 🏄🏾‍♀️ 🏄🏿‍♀️ 🏄‍♂️ 🏄🏻‍♂️ 🏄🏼‍♂️ 🏄🏽‍♂️ 🏄🏾‍♂️ 🏄🏿‍♂️ 🏊‍♀️ 🏊🏻‍♀️ 🏊🏼‍♀️ 🏊🏽‍♀️ 🏊🏾‍♀️ 🏊🏿‍♀️ 🏊‍♂️ 🏊🏻‍♂️ 🏊🏼‍♂️ 🏊🏽‍♂️ 🏊🏾‍♂️ 🏊🏿‍♂️ 🤽‍♀️ 🤽🏻‍♀️ 🤽🏼‍♀️ 🤽🏽‍♀️ 🤽🏾‍♀️ 🤽🏿‍♀️ 🤽‍♂️ 🤽🏻‍♂️ 🤽🏼‍♂️ 🤽🏽‍♂️ 🤽🏾‍♂️ 🤽🏿‍♂️ 🚣‍♀️ 🚣🏻‍♀️ 🚣🏼‍♀️ 🚣🏽‍♀️ 🚣🏾‍♀️ 🚣🏿‍♀️ 🚣‍♂️ 🚣🏻‍♂️ 🚣🏼‍♂️ 🚣🏽‍♂️ 🚣🏾‍♂️ 🚣🏿‍♂️ 🧗‍♀️ 🧗🏻‍♀️ 🧗🏼‍♀️ 🧗🏽‍♀️ 🧗🏾‍♀️ 🧗🏿‍♀️ 🧗‍♂️ 🧗🏻‍♂️ 🧗🏼‍♂️ 🧗🏽‍♂️ 🧗🏾‍♂️ 🧗🏿‍♂️ 🚵‍♀️ 🚵🏻‍♀️ 🚵🏼‍♀️ 🚵🏽‍♀️ 🚵🏾‍♀️ 🚵🏿‍♀️ 🚵‍♂️ 🚵🏻‍♂️ 🚵🏼‍♂️ 🚵🏽‍♂️ 🚵🏾‍♂️ 🚵🏿‍♂️ 🚴‍♀️ 🚴🏻‍♀️ 🚴🏼‍♀️ 🚴🏽‍♀️ 🚴🏾‍♀️ 🚴🏿‍♀️ 🚴‍♂️ 🚴🏻‍♂️ 🚴🏼‍♂️ 🚴🏽‍♂️ 🚴🏾‍♂️ 🚴🏿‍♂️ 🏆 🥇 🥈 🥉 🏅 🎫 🎟 🎪 🤹‍♀️ 🤹🏻‍♀️ 🤹🏼‍♀️ 🤹🏽‍♀️ 🤹🏾‍♀️ 🤹🏿‍♀️ 🤹‍♂️ 🤹🏻‍♂️ 🤹🏼‍♂️ 🤹🏽‍♂️ 🤹🏾‍♂️ 🤹🏿‍♂️ 🎭 🎨 🎬 🎤 🎧 🎼 🎹 🥁 🎷 🎺 🎸 🎻 🎲 🧩 🎯 🎳 🎮 🎰',
            },
            {
              name: '交通&旅行',
              value:
                '🚗 🚕 🚙 🚌 🚎 🏎 🚓 🚑 🚒 🚐 🚚 🚛 🚜 🛴 🚲 🛵 🏍 🚨 🚔 🚍 🚘 🚖 🚡 🚠 🚟 🚃 🚋 🚞 🚝 🚄 🚅 🚈 🚂 🚆 🚇 🚊 🚉 ✈️ 🛫 🛬 💺 🚀 🛸 🚁 🛶 ⛵️ 🚤 🚢 ⚓️ ⛽️ 🚧 🚦 🚥 🚏 🗿 🗽 🗼 🏰 🏯 🎡 🎢 🎠 ⛲️ 🌋 🗻 ⛺️ 🏠 🏡 🏭 🏢 🏬 🏣 🏤 🏥 🏦 🏨 🏪 🏫 🏩 💒 🏛 ⛪️ 🕌 🕍 🕋 🗾 🎑 🌅 🌄 🌠 🎇 🎆 🌇 🌆 🏙 🌃 🌌 🌉 🌁',
            },
            {
              name: '物体',
              value:
                '⌚️ 📱 📲 💻 ⌨️ 💽 💾 💿 📀 📼 📷 📸 📹 🎥 📞 ☎️ 📟 📠 📺 📻 ⏰ 🕰 ⌛️ ⏳ 📡 🔋 🔌 💡 🔦 💸 💵 💴 💶 💷 💰 💳 🧾 💎 ⚖️ 🔧 🔨 🔩 ⚙️ ⛓ 🔫 💣 🔪 ⚔️ 🚬 ⚰️ ⚱️ 🏺',
            },
            {
              name: '标志',
              value:
                '❤️ 🧡 💛 💚 💙 💜 🖤 💔 ❣️ 💕 💞 💓 💗 💖 💘 💝 💟 ☮️ ✝️ ☪️ ☸️ ✡️ 🔯 🕎 ☯️ ☦️ 🛐 ⛎ ♈️ ♉️ ♊️ ♋️ ♌️ ♍️ ♎️ ♏️ ♐️ ♑️ ♒️ ♓️ 🆔 ⚛️ 🉑 ☢️ ☣️ 📴 📳 🈶 🈚️ 🈸 🈺 🈷️ ✴️ 🆚 💮 🉐 ㊙️ ㊗️ 🈴 🈵 🈹 🈲 🅰️ 🅱️ 🆎 🆑 🅾️ 🆘 ❌ ⭕️ 🛑 ⛔️ 📛 🚫 💯 💢 ♨️ 🚷 🚯 🚳 🚱 🔞 📵 🚭 ❗️ ❕ ❓ ❔ ‼️ ⁉️ 🔅 🔆 〽️ ⚠️ 🚸 🔱 ⚜️ 🔰 ♻️ ✅ 🈯️ 💹 ❇️ ✳️ ❎ 🌐 💠 Ⓜ️ 🌀 💤 🏧 🚾 ♿️ 🅿️ 🈳 🈂️ 🛂 🛃 🛄 🛅 🚹 🚺 🚼 🚻 🚮 🎦 📶 🈁 🔣 ℹ️ 🔤 🔡 🔠 🆖 🆗 🆙 🆒 🆕 🆓 0️⃣ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 🔟 🔢 #️⃣ *️⃣ ⏏️ ▶️ ⏩ ⏪ ⏫ ⏬ ◀️ 🔼 🔽 ➡️ ⬅️ ⬆️ ⬇️ ↗️ ↘️ ↙️ ↖️ ↕️ ↔️ ↪️ ↩️ ⤴️ ⤵️ 🔀 🔁 🔂 🔄 🔃 🎵 🎶 ➕ ➖ ➗ ✖️ 💲 💱 ™️ ©️ ®️ 〰️ ➰ ➿ 🔚 🔙 🔛 🔝 🔜 ✔️ ☑️ 🔘 ⚪️ ⚫️ 🔴 🔵 🔺 🔻 🔸 🔹 🔶 🔷 🔳 🔲 🔈 🔇 🔉 🔊 🔔 🔕 📣 📢 👁‍ 🗨 💬 💭 🗯 ♠️ ♣️ ♥️ ♦️ 🃏 🎴 🀄️ 🕐 🕑 🕒 🕓 🕔 🕕 🕖 🕗 🕘 🕙 🕚 🕛 🕜 🕝 🕞 🕟 🕠 🕡 🕢 🕣 🕤 🕥 🕦 🕧',
            },
          ],
        },
      },
    });
  }

  initSiteMedia() {
    return this.prisma.prisma.siteConfig.create({
      data: {
        type: SiteConfigType.IMAGE,
        config: {
          enableWebp: true,
          webpThreshold: 10,
          enableThumbnail: true,
          thumbnailThreshold: 320,
          thumbnailWidth: 150,
          storageStrategy: 'local',
        },
      },
    });
  }

  initSiteUser() {
    return this.prisma.prisma.siteConfig.create({
      data: {
        type: SiteConfigType.USER,
        config: {
          allowRegister: true,
          allowUploadAvatar: true,
          notifyOnUserRegister: true,
          avatarList: [],
        },
      },
    });
  }

  initSiteAdvance() {
    return this.prisma.prisma.siteConfig.create({
      data: {
        type: SiteConfigType.ADVANCE,
        config: {
          tokenExpiresIn: 3,
        },
      },
    });
  }

  initPageMenu() {
    return this.prisma.prisma.pageMenu.create({
      data: {
        type: PageMenuType.NAVIGATION_NAV,
        data: [
          {
            id: 1,
            url: '/',
            icon: 'home',
            name: '首页',
            buttonType: 'url',
          },
          {
            id: 2,
            url: '/messages',
            icon: 'message',
            name: '留言板',
            buttonType: 'url',
          },
          {
            id: 3,
            url: '/links',
            icon: 'friends',
            name: '友链',
            buttonType: 'url',
          },
        ],
      },
    });
  }

  initPost(tag: Tag) {
    return this.prisma.prisma.post.create({
      data: {
        title: 'Test文章',
        alias: 'test',
        content: '## 这是标题\n这只是一个测试的文章地址\n## 这是标题11\n## 这是标题22',
        cover: '/avatar.gif',
        enableComment: true,
        visible: true,
        tags: {
          connect: [{ id: tag.id as number }],
        },
      },
    });
  }
}
