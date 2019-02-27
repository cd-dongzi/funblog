<template>
  <section class="reply-box" :class="{posTop: currentReplyObj}">
    <IconSvg class="close hover" name="close" v-show="currentReplyObj" @click.native="close"></IconSvg>
    <h3>{{!currentReplyObj ? '发表评论':'回复评论'}}</h3>
    <div class="item msg">
      <span class="item-tip">说点什么吧：</span>
      <textarea class="input-clear item-input" ref="msg" placeholder="Say something ..." @input="input" :value="msg"
        maxlength="200"></textarea>
    </div>
    <div class="item name">
      <span class="item-tip">昵称（必须）：</span>
      <input class="input-clear item-input" type="text" placeholder="昵称会被公开显示" v-model="info.name" maxlength="20">
    </div>
    <div class="item email">
      <span class="item-tip">email：</span>
      <input class="input-clear item-input" type="email" placeholder="Email不会被公开显示" v-model="info.email" maxlength="50">
    </div>
    <div class="item qq">
      <span class="item-tip">qq：</span>
      <input class="input-clear item-input" type="number" placeholder="QQ不会被公开显示" v-model="info.qq" maxlength="20">
    </div>
    <div class="item city">
      <span class="item-tip">city：</span>
      <input class="input-clear item-input" type="text" placeholder="City不会被公开显示" v-model="info.city" maxlength="20">
    </div>
    <div class="item url">
      <span class="item-tip">url：</span>
      <input class="input-clear item-input" type="text" placeholder="Url将会当做名字外链使用" v-model="info.url" maxlength="20">
    </div>
    <button class="btn-clear submit hover" @click="addComment">{{!currentReplyObj ? '发表评论':'回复评论'}}</button>
  </section>
</template>
<script>
  import {
    checkStr,
    filterHTMLTag
  } from '@/utils/string'
  import {
    randNumber
  } from 'utils/number'
  import BlogComment from '@/api/blog_comment'
  import config from '@/config'
  import sensitiveWords from '@/config/sensitiveWords'

  function getName(obj) {
    if (obj) {
      return `回复${obj.isAuthor ? '作者' : obj.name}：`
    } else {
      return ''
    }
  }

  export default {
    props: ['currentReplyObj', 'blogInfo'],
    data() {
      return {
        prefix: getName(this.currentReplyObj),
        msg: getName(this.currentReplyObj),
        Local: null,
        info: {
          msg: '',
          name: '',
          email: '',
          avatar: '',
          qq: '',
          city: '',
          url: '',
          articleid: this.$route.params.id
        }
      }
    },
    mounted() {
      this.initInfo()
    },
    watch: {
      currentReplyObj() {
        this.initInfo()
      }
    },
    methods: {
      initInfo() {
        this.info.msg = getName(this.currentReplyObj)
        if (!this.currentReplyObj) {
          this.msg = ''
        }
        this.info = Object.assign({}, this.info, this.$store.state.user.info)
      },
      close() {
        this.$emit('close')
      },
      input(e) {
        let val = e.target.value
        if (this.currentReplyObj) {
          if (val.indexOf(this.prefix) === 0) {
            this.info.msg = val.replace(this.prefix, '')
            this.msg = val
          } else {
            this.msg = this.prefix
            e.target.value = this.msg
          }
        } else {
          this.msg = this.info.msg = val
        }
      },
      checkInfo() {
        let msg = ''
        if (!this.info.name) {
          msg = '请输入姓名'
        } else if (!this.info.msg) {
          msg = '请输入评论信息'
        } else if (this.info.email && !checkStr(this.info.email, 'email')) {
          msg = '请输入正确的邮箱'
        } else if (this.info.qq && !checkStr(this.info.qq, 'QQ')) {
          msg = '请输入正确的QQ号'
        } else if (this.info.url && !checkStr(this.info.url, 'URL')) {
          msg = '请输入正确的Url'
        }
        let word = sensitiveWords.concat(['作者']).find(word => this.info.name.indexOf(word) >= 0)
        if (word) {
          msg = `存在非法词：${word}`
        }
        word = sensitiveWords.find(word => this.info.msg.indexOf(word) >= 0)
        if (word) {
          msg = `存在非法词：${word}`
        }
        if (msg) {
          this.$toast(msg)
          return false
        } else {
          return true
        }
      },
      // 写评论
      async addComment() {
        if (!this.checkInfo()) return
        this.info.msg = filterHTMLTag(this.info.msg)
        this.info.title = this.blogInfo.title

        // 是作者本人
        if (this.info.name === 'DongZi') {
          this.info.isAuthor = true
          this.info.avatar = 0
        } else {
          this.info.isAuthor = false
          if (!this.info.avatar) {
            this.info.avatar = randNumber(1, 21)
          }
        }
        this.$store.commit('SET_USERINFO', this.info)

        // 这是回复评论
        if (this.currentReplyObj) {
          let {
            name,
            city,
            email,
            qq,
            url,
            _id
          } = this.currentReplyObj
          this.info._id = _id
          this.info.createTime = new Date()


          delete this.currentReplyObj.reply_list
          this.info.questioner = this.currentReplyObj

          await this.addReplyComment(this.info)
        } else {
          await this.addBlogComment(this.info)
        }
        this.initInfo()
        this.$emit('add')
      },
      // 回复评论
      async addReplyComment(info) {
        return new Promise(async resolve => {
          const res = await BlogComment.updateBlogComment(info)
          resolve()
        })

      },
      // 添加评论
      addBlogComment(params) {
        return new Promise(async resolve => {
          const res = await BlogComment.addBlogComment(params)
          resolve()
        })
      }
    }
  }
</script>
<style lang="less">
  .reply-box {
    position: relative;
    margin-top: 20px;

    &.posTop {
      &:before {
        content: '';
        position: absolute;
        width: 1px;
        height: 10px;
        background: @vice-color;
        left: 50%;
        bottom: 98%;
      }
    }

    .close {
      position: absolute;
      right: 0px;
      top: 10px;
      color: @vice-color;
      font-size: 50px;

      &:hover {
        color: @theme-color;
      }
    }

    h3 {
      text-align: center;
      padding: 20px 0;
      color: @theme-color;
    }

    .item {
      .item-tip {
        font-size: 12px;
        margin-bottom: 4px;
        display: block;
        color: @vice-color;
        margin-top: 20px;
      }

      .item-input {
        width: 100%;
        background: rgba(186, 164, 119, 0.4);
        border: 1px solid @vice-color;
        min-height: 35px;
        text-indent: 1em;
        color: @theme-color;

        &::-webkit-input-placeholder {
          color: @vice-color;
        }
      }

      textarea {
        line-height: 24px;
        padding: 8px 0px;
        height: 80px;
        resize: none;
        // .button {
        //     color: @theme-color;
        // }
      }
    }

    .submit {
      width: 120px;
      height: 40px;
      vertical-align: bottom;
      text-align: center;
      line-height: 40px;
      border-radius: 20px;
      color: #fff;
      background: @btn-linear-gradient;
      display: block;
      margin: 0 auto;
      margin-top: 20px;
    }
  }
</style>