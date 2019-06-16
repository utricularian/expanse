import AbstractRepository from "./abstractRepository";
import SystemObject from "../../src/models/systemObject";
import databaseDriver from "../drivers/databaseDriver";
import StringHelpers from "../helpers/stringHelpers";

let _instance;

class SystemObjectRepository extends AbstractRepository {
  _TABLE_NAME = 'system_objects';

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
    const keyMarkers = Object.keys(new SystemObject({})).map(StringHelpers.snakeCase);

    const findSql = `
      SELECT ${keyMarkers.join(', ')}
      from ${this._TABLE_NAME}
      WHERE system_id = $1
      ORDER BY radians_from_system_gate ASC, id
    `.trim();

    const listOfAttributes = await databaseDriver.db().any(findSql, systemId);
    return listOfAttributes.map((attr) => StringHelpers.camelifyObject(attr)).map((attr) => new SystemObject(attr));
  }
}

export default new SystemObjectRepository();
