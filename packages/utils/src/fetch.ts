interface ResponseData<T> {
  code: number;
  data: T;
  message: string;
}
type RequestOptions = Omit<RequestInit, 'body'> & {
  body?: any;
  params?: any;
};
interface FetchOptions {
  prefix?: string;
  onError?: (err: Error) => void;
  onResponse?: <T>(res: ResponseData<T>) => void;
  setHeader?: (options?: RequestOptions) => Promise<Record<string, any>> | Record<string, any>;
  setPrefix?: () => string;
}
const DEFAULT_ERROR_MSG = '服务器繁忙，请稍后再试~';
const CODE_WHITELIST = [201, 200, 304, 400];

class Fetch {
  prefix = '';
  _onError?: (err: Error) => void;
  _onResponse?: <T>(res: ResponseData<T>) => void;
  _setHeader?: (options?: RequestOptions) => Record<string, any>;
  _setPrefix?: () => string;
  constructor(options: FetchOptions) {
    this.prefix = options.prefix || this.prefix;
    this._onError = options.onError;
    this._setHeader = options.setHeader;
    this._setPrefix = options.setPrefix;
    this._onResponse = options.onResponse;
  }

  _req<T>(url: string, options?: RequestOptions) {
    const prefix = this._setPrefix?.() || this.prefix;
    return fetch(prefix + url, {
      ...options,
    })
      .then(this.checkStatusCode())
      .then<ResponseData<T>>((res) => res.json())
      .then(this.checkCode())
      .catch(this.onError());
  }

  get<T>(url: string, { params, ...options } = {} as RequestOptions) {
    return new Promise<T>((resolve, reject) => {
      this.mergeOptions({ ...options })
        .then((_options) => {
          const urlParams = new URLSearchParams(params);
          const _url = urlParams.size ? `${url}?${urlParams}` : `${url}`;
          return this._req<T>(_url, { ...options, ..._options })
            .then(resolve)
            .catch(reject);
        })
        .catch(reject);
    });
  }

  post<T>(url: string, options?: RequestOptions) {
    // return this._req<T>(url, {
    //   ...options,
    //   ...this.mergeOptions(options),
    //   method: 'POST',
    // });
    return new Promise<T>((resolve, reject) => {
      this.mergeOptions(options)
        .then((_options) => {
          this._req<T>(url, {
            ...options,
            ..._options,
            method: 'POST',
          })
            .then(resolve)
            .catch(reject);
        })
        .catch(reject);
    });
  }

  file<T>(url: string, options?: RequestOptions) {
    // return this._req<T>(url, {
    //   ...options,
    //   headers: {
    //     ...this.mergeHeaders(options),
    //   },
    //   method: 'POST',
    // });
    return new Promise<T>((resolve, reject) => {
      this.mergeHeaders(options)
        .then((_headers) => {
          this._req<T>(url, {
            ...options,
            headers: {
              ..._headers,
            },
            method: 'POST',
          })
            .then(resolve)
            .catch(reject);
        })
        .catch(reject);
    });
  }

  patch<T>(url: string, options?: RequestOptions) {
    // return this._req<T>(url, {
    //   ...options,
    //   ...this.mergeOptions(options),
    //   method: 'PATCH',
    // });
    return new Promise<T>((resolve, reject) => {
      this.mergeOptions(options)
        .then((_options) => {
          this._req<T>(url, {
            ...options,
            ..._options,
            method: 'PATCH',
          })
            .then(resolve)
            .catch(reject);
        })
        .catch(reject);
    });
  }

  delete<T>(url: string, options?: RequestOptions) {
    return new Promise<T>((resolve, reject) => {
      this.mergeOptions(options)
        .then((_options) => {
          this._req<T>(url, {
            ...options,
            ..._options,
            method: 'DELETE',
          })
            .then(resolve)
            .catch(reject);
        })
        .catch(reject);
    });
    // const _options = this.mergeOptions(options).then((_options) => {

    // })
    // return this._req<T>(url, {
    //   ...options,
    //   ..._options,
    //   method: 'DELETE',
    // });
  }

  async mergeOptions(options?: RequestOptions) {
    return {
      headers: {
        'Content-Type': 'application/json',
        ...(await this.mergeHeaders(options)),
      },
      body: options?.body ? JSON.stringify(options.body) : null,
      method: options?.method || 'GET',
    };
  }

  async mergeHeaders(options?: RequestOptions) {
    return {
      ...((await this._setHeader?.(options)) || {}),
      ...(options?.headers || {}),
    };
  }

  checkStatusCode() {
    return (res: Response) => {
      if (CODE_WHITELIST.some((code) => code === res.status)) {
        return res;
      }
      throw new Error(res.statusText || DEFAULT_ERROR_MSG);
    };
  }

  checkCode<T>() {
    return (res: ResponseData<T>) => {
      if (res.code === 0) {
        return res?.data;
      }
      this._onResponse<T>?.(res);
      throw new Error(res.message || DEFAULT_ERROR_MSG);
    };
  }

  onError() {
    return (err: Error) => {
      this._onError?.(err);
      throw err;
    };
  }
}

export default Fetch;
