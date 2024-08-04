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
    const response = await request();

    if (response.ok) {
      return await response.json();
    } else {
      let errorMessage: string | undefined;

      try {
        const errorBody = await response.json();
        errorMessage = errorBody.error;
      } catch {
        console.log('Fetch error did not contain json body');
      }

      switch (response.status) {
        // TODO
        case StatusCodes.BAD_REQUEST:
        case StatusCodes.UNAUTHORIZED:
        case StatusCodes.NOT_FOUND:
        case StatusCodes.CONFLICT:
        case StatusCodes.TOO_MANY_REQUESTS:
        case StatusCodes.INTERNAL_SERVER_ERROR:
        case StatusCodes.BAD_GATEWAY:
        case StatusCodes.GATEWAY_TIMEOUT:

        default:
          throw Error(
            'Status code: ' + response.status + ' Error: ' + errorMessage
          );
      }
    }
  }
}
