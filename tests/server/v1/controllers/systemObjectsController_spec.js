import request from 'supertest';

import app from '../../../../server/app';
import databaseDriver from '../../../../server/drivers/databaseDriver';

import systemRepository from '../../../../server/repositories/systemRepository';
import systemObjectRepository from '../../../../server/repositories/systemObjectRepository';

import systemFactory from '../../../factories/entities/systemFactory';
import systemObjectFactory from '../../../factories/entities/systemObjectFactory';
import SystemObject from "../../../../src/models/systemObject";


describe('SystemObjectsController Test', () => {
  beforeEach(async () => {
    const db = databaseDriver.db();
    await db.none(`
DO
$func$
BEGIN
   -- RAISE NOTICE '%', 
   EXECUTE
   (SELECT 'TRUNCATE TABLE ' || string_agg(oid::regclass::text, ', ') || ' CASCADE'
    FROM   pg_class
    WHERE  relkind = 'r'  -- only tables
    AND    relnamespace = 'public'::regnamespace
    AND    relname != 'pgmigrations'
   );
END
$func$;

    `.trim());
  });


  afterEach(() => {

  });

  describe('GET /api/systems/:systemId/system_objects', () => {
    let system, systemObject1, systemObject2;

    beforeEach(async () => {
      system = systemFactory.createSystem();
      const system2 = systemFactory.createSystem();
      await systemRepository.save(system);
      await systemRepository.save(system2);

      systemObject1 = systemObjectFactory.createSystemObject({system: system});
      systemObject2 = systemObjectFactory.createSystemObject({system: system});

      await systemObjectRepository.save(systemObject1);
      await systemObjectRepository.save(systemObject2);

      await systemObjectRepository.save(systemObjectFactory.createSystemObject({system: system2}));
    });

    test('it should return only system objects for the given system', async () => {
      const response = await request(app)
        .get(`/api/systems/${system.id}/system_objects`)
        .set('Content-Type', 'application/json');
      expect(response.status).toBe(200);
      const fromServer = JSON.parse(response.text);

      expect(fromServer.data.length).toEqual(2);
      expect(new SystemObject(fromServer.data[0].attributes)).toEqual(systemObject1);
      expect(new SystemObject(fromServer.data[1].attributes)).toEqual(systemObject2);
    });
  });
});
