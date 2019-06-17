import request from 'request-promise-native';

export default class ApiRequest {
  async makeRequest(path, params) {
    params = params || {};

    const options = {
      url: `http://localhost:3006${path}`,
      method: params.method || 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const raw = await request(options);
    return JSON.parse(raw);
  }
}
