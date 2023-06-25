import { Injectable } from '@angular/core';
import { EndPointsKeys, api } from '../configs/axios.config';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  async get<T>(endpoint: EndPointsKeys) {
    return await api.get<T>(`${endpoint}?_start=0&_limit=10`);
  }
  async delete<T>(endpoint: EndPointsKeys, id: string) {
    return await api.delete<T>(`${endpoint}/${id}`);
  }
  async post<T>(endpoint: EndPointsKeys, data: any) {
    return await api.post<T>(`${endpoint}?_start=0&_limit=10`, data);
  }
  async put<ResponseT, BodyT>(
    endpoint: EndPointsKeys,
    id: string,
    data: BodyT
  ) {
    return await api.put<ResponseT>(`${endpoint}/${id}`, data);
  }
}
