import databaseDriver from "../drivers/databaseDriver";

const UNIVERSAL_KEYS = ['id', 'createdAt'];

class AbstractRepository {
  async _find(id, emptyEntity) {
    const keyMarkers = Object.keys(emptyEntity).map((el) => `"${el}"`);

    const findSql = `
      SELECT ${keyMarkers.join(', ')}
      FROM ${this._TABLE_NAME}
      WHERE id = $1
    `.trim();

    const results = await databaseDriver.db().one(findSql, id);
    return results;
  }

  async _save(entity, emptyEntity) {
    const keys = [];
    const values = [];

    const entityKeys = Object.keys(emptyEntity).filter((el) => !UNIVERSAL_KEYS.includes(el));

    Object.entries(entity).forEach((tuple) => {
      const incomingKey = tuple[0];
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
        RETURNING id, "createdAt"
    `.trim();

    const result = await databaseDriver.db().one(insertSql, values);
    entity.id = result.id;
    entity.createdAt = result.createdAt;
    return entity;
  }
}

export default AbstractRepository;
