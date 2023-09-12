import { Injectable } from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class ServicesApiExternes {
  async get(url: string, options?: any) {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    });
    return await response.data;
  }

  async post(url: string, data: any, options?: any) {
    console.log(url, data);
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...(options?.headers || {}),
      },
    });
    return await response.data;
  }

  async put(url: string, data: any, options?: any) {
    const response = await axios.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    });
    return response.data;
  }

  async delete(url: string, options?: any) {
    const response = await axios.delete(url, {
      headers: { ...(options?.headers || {}) },
    });
    return response.data;
  }

  async token(url: string, data: any, options?: any) {
    const response = await axios
      .post(url, data, {
        headers: {
          'Content-Type': 'application/json',
          ...(options?.headers || {}),
        },
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
