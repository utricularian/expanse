
export default class ApiPayload {

  constructor(data) {
    this.data = data;
  }

  toJSON() {
    return JSON.stringify({
      data: this.data,
      meta: {},
      links: [],
      jsonapi: {},
      included: []
    });
  }
}
