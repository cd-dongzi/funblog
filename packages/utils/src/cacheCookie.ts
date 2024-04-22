const cacheCookie = {
  get(key: string) {
    const arr = document.cookie.split('; ');
    for (let i = 0; i < arr.length; i++) {
      const arr2 = arr[i].trim().split('=');
      if (arr2[0] === key) {
        return arr2[1];
      }
    }
    return '';
  },
  set(
    key: string,
    value: any,
    options = {} as {
      day?: number;
      isSetTopDomain?: boolean;
    },
  ) {
    const day = options.day || 7;
    const isSetTopDomain = options.isSetTopDomain;
    let domain = window.location.hostname;
    if (isSetTopDomain) {
      domain = domain.split('.').slice(-2).join('.');
    }
    // eslint-disable-next-line prefer-rest-params
    const setting = arguments[0];
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Object') {
      for (const i in setting) {
        const oDate = new Date();
        oDate.setDate(oDate.getDate() + day);
        document.cookie = i + '=' + setting[i] + ';path=/;domain=' + domain + ';expires=' + oDate;
      }
    } else {
      const oDate = new Date();
      oDate.setDate(oDate.getDate() + day);
      document.cookie = key + '=' + value + ';path=/;domain=' + domain + ';expires=' + oDate;
    }
  },
  remove(
    key: string,
    options = {} as {
      isSetTopDomain?: boolean;
    },
  ) {
    // eslint-disable-next-line prefer-rest-params
    const setting = arguments[0];
    if (Object.prototype.toString.call(setting).slice(8, -1) === 'Array') {
      setting.forEach((key: string) => {
        this.set(key, 1, {
          ...options,
          day: -1,
        });
      });
    } else {
      this.set(key, 1, {
        ...options,
        day: -1,
      });
    }
  },
};
export default cacheCookie;
