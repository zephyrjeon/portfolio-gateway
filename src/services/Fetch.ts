import { StatusCodes } from 'http-status-codes';

export class Fetch {
  static baseInit: RequestInit = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  static async get(input: RequestInfo) {
    return this.responseHandler(() =>
      fetch(input, {
        ...this.baseInit,
        method: 'GET',
      })
    );
  }

  static async post(input: RequestInfo, body: {}) {
    return this.responseHandler(() =>
      fetch(input, {
        ...this.baseInit,
        method: 'POST',
        body: JSON.stringify(body),
      })
    );
  }

  static async put(input: RequestInfo, body: {}) {
    return this.responseHandler(() =>
      fetch(input, {
        ...this.baseInit,
        method: 'PUT',
        body: JSON.stringify(body),
      })
    );
  }

  static async delete(input: RequestInfo, body: {}) {
    return this.responseHandler(() =>
      fetch(input, {
        ...this.baseInit,
        method: 'DELETE',
        body: JSON.stringify(body),
      })
    );
  }

  private static async responseHandler(request: () => Promise<Response>) {
    try {
      let body: any;
      const response = await request();

      if (response.headers.get('Content-Type')?.includes?.('json')) {
        body = await response.json();
      } else {
        body = await response.text();
      }

      if (response.ok) {
        return body;
      } else {
        // TODO: error handling
        switch (response.status) {
          case StatusCodes.BAD_REQUEST:
          case StatusCodes.UNAUTHORIZED:
          case StatusCodes.NOT_FOUND:
          case StatusCodes.CONFLICT:
          case StatusCodes.TOO_MANY_REQUESTS:
          case StatusCodes.INTERNAL_SERVER_ERROR:
          case StatusCodes.BAD_GATEWAY:
          case StatusCodes.GATEWAY_TIMEOUT:
          default:
            console.log('Fetch Error', response, body);
            return { response, body };
        }
      }
    } catch {
      console.log('Unknown Fetch Error');
    }
  }
}
