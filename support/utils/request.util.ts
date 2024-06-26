
import { APIRequestContext, APIResponse } from '@playwright/test'

export default class API {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  private async makeRequest(endpoint: string,  method: string, queryParams?: object, reqBody?: object) {


    const requestOptions = {
      params: {
        key: process.env.API_KEY,
        format: 'json',
        ...queryParams
      },
      data: reqBody,
    };

    const res: APIResponse = await this.request[method](`${process.env.API_URL}/${endpoint}`, requestOptions);
    return {statusCode: res.status(), headers: res.headers(), data: await res.json()};
  }

    async getRequest(endpoint: string, queryParams?: object) {
    return this.makeRequest(endpoint, 'get', queryParams);
  }
  // Altough unused, added to showcase how a complete util class would look like
  async postRequest(endpoint: string, reqBody: object, queryParams?: object) {
    return this.makeRequest(endpoint, 'post', queryParams, reqBody);
  }

  async putRequest(endpoint: string, reqBody: object, queryParams?: object) {
    return this.makeRequest(endpoint, 'put', queryParams, reqBody);
  }

  async patchRequest(endpoint: string, reqBody: object, queryParams?: object) {
    return this.makeRequest(endpoint, 'patch', queryParams, reqBody);
  }

  async deleteRequest(endpoint: string, queryParams?: object ) {
    return this.makeRequest(endpoint, 'delete', queryParams);
  }
}
