import databaseDriver from "../drivers/databaseDriver";

const UNIVERSAL_KEYS = ['id', 'createdAt'];

class AbstractRepository {
  snakeCase(camelCase) {
    return camelCase.split(/(?=[A-Z])/).join('_').toLowerCase();
  }

  camelCase(snakeCase) {
    return snakeCase.replace(/(_.)/g, (match) => match.toUpperCase()).replace(/_/g, '');
  }

  camelifyObject(object) {
    const camelified = {};
    Object.entries(object).forEach((entry) => {
      camelified[this.camelCase(entry[0])] = entry[1];
    });
    return camelified;
  }

  async _find(id, emptyEntity) {
    const keyMarkers = Object.keys(emptyEntity).map(this.snakeCase);

    const findSql = `
      SELECT ${keyMarkers.join(', ')}
      FROM ${this._TABLE_NAME}
      WHERE id = $1
    `.trim();

    return this.camelifyObject(await databaseDriver.db().one(findSql, id));
  }

  async _findAll(emptyEntity) {
    const keyMarkers = Object.keys(emptyEntity).map(this.snakeCase);

    const findSql = `
      SELECT ${keyMarkers.join(', ')}
      FROM ${this._TABLE_NAME}
      ORDER BY id
    `.trim();


    return (await databaseDriver.db().any(findSql)).map((attr) => this.camelifyObject(attr));
  }

  async _save(entity, emptyEntity) {
    const keys = [];
    const values = [];

    const entityKeys = Object.keys(emptyEntity).filter((el) => !UNIVERSAL_KEYS.includes(el)).map(this.snakeCase);

    Object.entries(entity).forEach((tuple) => {
      const incomingKey = this.snakeCase(tuple[0]);
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
