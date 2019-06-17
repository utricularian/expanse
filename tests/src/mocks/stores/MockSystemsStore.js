
export default class MockSystemsStore {
  constructor(props) {
    this._data = props && props.mockData ? props.mockData : [];
  }

  findAll() {
    this._findAllPromise = Promise.resolve(this._data);
    return this._findAllPromise;
  }
}
