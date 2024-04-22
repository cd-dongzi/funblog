import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';

function createAxios(config = {} as AxiosRequestConfig) {
  return axios.create({
    timeout: 30000,
    ...config,
  });
}
const http = createAxios();

interface RequestParams {
  method: string;
  url: string;
  data?: Record<string, any>;
}

@Injectable()
export class HttpService {
  constructor() {}

  async request<T>(params: RequestParams) {
    const res = await http({
      ...params,
    });
    return res.data as T;
  }

  get<T = any>(url: string, params?: Omit<RequestParams, 'url' | 'method'>) {
    return this.request<T>({
      method: 'GET',
      url,
      ...params,
    });
  }

  post<T = any>(url: string, params?: Omit<RequestParams, 'url' | 'method'>) {
    return this.request<T>({
      method: 'POST',
      url,
      ...params,
    });
  }
}
