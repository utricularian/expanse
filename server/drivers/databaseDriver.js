import PGPromise from 'pg-promise';

let instance = null;

class DatabaseDriver {

  constructor() {
    if (!instance) {
      instance = this;
      const pgp = PGPromise();
      instance._db = pgp(process.env.DATABASE_URL);
    }

    return instance;
  }

  db() {
    return this._db;
  }
}

export default new DatabaseDriver();
