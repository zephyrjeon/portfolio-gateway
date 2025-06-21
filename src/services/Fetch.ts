import { StatusCodes } from 'http-status-codes';

export class Fetch {
  static baseInit: RequestInit = {
    credentials: 'include',
  };

  static baseHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  static async get(input: RequestInfo, init: RequestInit = {}) {
    const { headers, body, ...rest } = init;

    return this.responseHandler(() =>
      fetch(input, {
        ...this.baseInit,
        method: 'GET',
        headers: {
          ...this.baseHeaders,
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        ...rest,
      })
    );
  }

  static async post(input: RequestInfo, init: RequestInit = {}) {
    const { headers, body, ...rest } = init;

    return this.responseHandler(() =>
      fetch(input, {
        ...this.baseInit,
        method: 'POST',
        headers: {
          ...this.baseHeaders,
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        ...rest,
      })
    );
  }

  static async put(input: RequestInfo, init: RequestInit = {}) {
    const { headers, body, ...rest } = init;

    return this.responseHandler(() =>
      fetch(input, {
        ...this.baseInit,
        method: 'PUT',
        headers: {
          ...this.baseHeaders,
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        ...rest,
      })
    );
  }

  static async delete(input: RequestInfo, init: RequestInit = {}) {
    const { headers, body, ...rest } = init;

    return this.responseHandler(() =>
      fetch(input, {
        ...this.baseInit,
        method: 'DELETE',
        headers: {
          ...this.baseHeaders,
          ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        ...rest,
      })
    );
  }

  private static async responseHandler(request: () => Promise<Response>) {
    let body: any;
    const response = await request();

    if (response.headers.get('Content-Type')?.includes?.('json')) {
      body = await response.json();
    } else {
      body = await response.text();
    }

    return { response, body };
  }
}
