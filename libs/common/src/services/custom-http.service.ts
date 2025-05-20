// libs/common/src/services/custom-http.service.ts

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class CustomHttpService {
  constructor(private readonly httpService: HttpService) {}

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this._handle(() => this.httpService.get<T>(url, config));
  }

  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this._handle(() => this.httpService.post<T>(url, data, config));
  }

  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this._handle(() => this.httpService.put<T>(url, data, config));
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this._handle(() => this.httpService.delete<T>(url, config));
  }

  private async _handle<T>(fn: () => any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await firstValueFrom(fn());
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;

      const status =
        axiosError.response?.status || HttpStatus.INTERNAL_SERVER_ERROR;
      const data = axiosError.response?.data || {
        message: 'Internal server error',
      };

      throw new HttpException(data, status);
    }
  }
}
