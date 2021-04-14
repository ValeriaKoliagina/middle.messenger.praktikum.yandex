const METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE'
};

export interface IRequestOptions {
  timeout?: number;
  method?: string;
  data?: Record<string, unknown>;
  headers?: Record<string, string>;
}

function queryStringify(data: Record<string, unknown>) {
  let str = '?';
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      str += `${key}=${data[key]}&`;
    }
  }

  return str.slice(0, str.length - 1);
}

class HTTPTransport {
  get(url: string, options: IRequestOptions = { method: METHODS.GET }): Promise<XMLHttpRequest> {
    return this.request(url, { ...options }, options.timeout);
  }

  request(url: string, options: IRequestOptions, timeout = 5000): Promise<XMLHttpRequest> {
    const { method, data, headers } = options;
    let path = url;

    if (method === METHODS.GET && data) {
      path = `${url}${queryStringify(data)}`;
    }

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.timeout = timeout;
      xhr.open(method!, path);

      xhr.onload = function() {
        if (xhr.status !== 200) {
          reject(xhr);
        }
        resolve(xhr);
      };

      headers && Object.entries(headers).map(entry => xhr.setRequestHeader(...entry));

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}

export default  HTTPTransport;
