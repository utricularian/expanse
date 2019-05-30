import AbstractRepository from "./abstractRepository";
import SystemObject from "../../src/models/systemObject";
import databaseDriver from "../drivers/databaseDriver";

let _instance;

class SystemObjectRepository extends AbstractRepository {
  _TABLE_NAME = '"systemObjects"';

  constructor() {
    super();
    if (!_instance) {
      _instance = this;
    }

    return _instance;
  }

  async save(systemObject) {
    await this._save(systemObject, new SystemObject({}));
  }

  async findAllBySystemId(systemId) {
    const keyMarkers = Object.keys(new SystemObject({})).map((el) => `"${el}"`);

    const findSql = `
      SELECT ${keyMarkers.join(', ')}
      from ${this._TABLE_NAME}
      WHERE "systemId" = $1
      ORDER BY id
    `.trim();

    const listOfAttributes = await databaseDriver.db().any(findSql, systemId);
    return listOfAttributes.map((attr) => new SystemObject(attr));
  }
}

export default new SystemObjectRepository();
