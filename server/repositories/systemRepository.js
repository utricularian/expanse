import AbstractRepository from "./abstractRepository";
import System from "../../src/models/system";

let _instance;

class SystemRepository extends AbstractRepository {
  _TABLE_NAME = 'systems';

  constructor() {
    super();
    if (!_instance) {
      _instance = this;
    }

    return _instance;
  }

  async find(id) {
    return new System(await this._find(id, new System({})));
  }

  async findAll() {
    return (await this._findAll(new System({}))).map((data) => new System(data));
  }

  async save(system) {
    await this._save(system, new System({}));
  }

}

export default new SystemRepository();
