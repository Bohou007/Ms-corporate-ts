import { Injectable } from '@nestjs/common';
@Injectable()
export class ServicesApiExternes {
  async get(url: string, options?: any) {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      ...options,
    });
    return await response.json();
  }

  async post(url: string, data: any, options?: any) {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      ...options,
    });
    return response.json();
  }

  async put(url: string, data: any, options?: any) {
    const response = await fetch(url, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      ...options,
    });
    return response.json();
  }

  async delete(url: string, options?: any) {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: { ...options?.headers },
      ...options,
    });
    return response.json();
  }

  async token(url: string, data: any, options?: any) {
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json', ...options?.headers },
      ...options,
    })
      .then((response: any) => {
        console.log(response);
        return true;
      })
      .catch((err: { response: { status: number; data: any } }) => {
        console.log(err);
        return [err.response.status, err.response.data];
      });
    return response;
  }
}
