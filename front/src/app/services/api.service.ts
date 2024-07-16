import { Injectable, Inject } from '@angular/core';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private axiosInstance: AxiosInstance;

  constructor(@Inject('BASE_URL') private baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  private handleResponse(response: AxiosResponse) {
    return response.data;
  }

  private handleError(error: any) {
    return Promise.reject(error.response || error.message);
  }

  public get(endpoint: string, config?: AxiosRequestConfig): Promise<any> {
    return this.axiosInstance.get(endpoint, config)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  public post(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<any> {
    return this.axiosInstance.post(endpoint, data, config)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  public put(endpoint: string, data: any, config?: AxiosRequestConfig): Promise<any> {
    return this.axiosInstance.put(endpoint, data, config)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  public delete(endpoint: string, config?: AxiosRequestConfig): Promise<any> {
    return this.axiosInstance.delete(endpoint, config)
      .then(this.handleResponse)
      .catch(this.handleError);
  }
}
