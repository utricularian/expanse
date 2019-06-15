import request from 'supertest';

import { expect } from 'chai';

import app from '../../../../server/app';

import systemRepository from '../../../../server/repositories/systemRepository';
import systemObjectRepository from '../../../../server/repositories/systemObjectRepository';

import systemFactory from '../../../factories/entities/systemFactory';
import systemObjectFactory from '../../../factories/entities/systemObjectFactory';
import SystemObject from "../../../../src/models/systemObject";


describe('SystemObjectsController Test', () => {
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

    it('should reject when content-type is not json', async () => {
      const response = await request(app).get(`/api/systems/${system.id}/system_objects`);
      expect(response.status).to.equal(415);
      expect(response.text).to.eql('Content-Type must be "application/json"');
    });

    it('it should return only system objects for the given system', async () => {
      const response = await request(app)
        .get(`/api/systems/${system.id}/system_objects`)
        .set('Content-Type', 'application/json');
      expect(response.status).to.equal(200);
      expect(response.text).not.to.be.undefined;
      const fromServer = JSON.parse(response.text);

      expect(fromServer.data.length).to.equal(2);
      expect(new SystemObject(fromServer.data[0].attributes)).to.eql(systemObject1);
      expect(new SystemObject(fromServer.data[1].attributes)).to.eql(systemObject2);
    });
  });
});
