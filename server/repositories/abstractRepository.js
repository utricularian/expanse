import databaseDriver from "../drivers/databaseDriver";

import StringHelpers from "../helpers/stringHelpers";

const UNIVERSAL_KEYS = ['id', 'createdAt'];

class AbstractRepository {
  async _find(id, emptyEntity) {
    const keyMarkers = Object.keys(emptyEntity).map(StringHelpers.snakeCase);

    const findSql = `
      SELECT ${keyMarkers.join(', ')}
      FROM ${this._TABLE_NAME}
      WHERE id = $1
    `.trim();

    return StringHelpers.camelifyObject(await databaseDriver.db().one(findSql, id));
  }

  async _findAll(emptyEntity) {
    const keyMarkers = Object.keys(emptyEntity).map(StringHelpers.snakeCase);

    const findSql = `
      SELECT ${keyMarkers.join(', ')}
      FROM ${this._TABLE_NAME}
      ORDER BY id
    `.trim();


    return (await databaseDriver.db().any(findSql)).map((attr) => StringHelpers.camelifyObject(attr));
  }

  async _save(entity, emptyEntity) {
    const keys = [];
    const values = [];

    const entityKeys = Object.keys(emptyEntity).filter((el) => !UNIVERSAL_KEYS.includes(el)).map(StringHelpers.snakeCase);

    Object.entries(entity).forEach((tuple) => {
      const incomingKey = StringHelpers.snakeCase(tuple[0]);
      if (entityKeys.includes(incomingKey)) {
        keys.push(incomingKey);
        values.push(tuple[1]);
      }
    });

    const keyMarkers = keys.map((el) => `"${el}"`);
    const valuesMarkers = values.map((_, i) => `$${i + 1}`);

    const insertSql = `
      INSERT INTO ${this._TABLE_NAME} (${keyMarkers.join(', ')}) 
        VALUES (${valuesMarkers.join(', ')}) 
        RETURNING id, "created_at"
    `.trim();

    const result = await databaseDriver.db().one(insertSql, values);
    entity.id = result.id;
    entity.createdAt = result.created_at;
    return entity;
  }
}

export default AbstractRepository;
