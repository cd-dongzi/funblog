export default {
  github: {
    username: '',
    token: '',
    oauth: {
      url: 'https://github.com/login/oauth/authorize',
      redirect_uri: '',
      client_id: '',
      client_secret: ''
    }
  },
  google: {
    oauth: {
      url: '',
      redirect_uri: '',
      client_id: '',
      client_secret: ''
    }
  },
  qq: {
    oauth: {
      url: 'https://graph.qq.com/oauth2.0/authorize',
      redirect_uri: '',
      appId: '',
      appKey: ''
    }
  },
  oss: {
    accessKeyId: '',
    accessKeySecret: ''
  },
  sms: {
    PhoneNumbers: '',
    SignName: '',
    accessKeyId: '',
    accessKeySecret: ''
  },
  sentry: {
    dsn: ''
  },
  mongodb: {
    dev: {
      db: 'blog-test',
      username: 'root',
      password: '123456'
    },
    prod: {
      db: 'blog-test',
      username: 'root',
      password: '123456'
    }
  },
  loginEmailWhiteList: [],
  jwtSecret: 'jwt_test',
  adminJwtSecret: 'admin_jwt_test',
  authorSecret: 'author_secret'
}
