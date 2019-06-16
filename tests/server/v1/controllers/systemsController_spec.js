import request from 'supertest';

import { expect } from 'chai';

import app from '../../../../server/app';

import systemRepository from '../../../../server/repositories/systemRepository';
import System from "../../../../src/models/system";

import systemFactory from '../../../factories/entities/systemFactory';

describe('SystemsController Test', () => {
  describe('GET /api/systems', () => {
    let system1, system2, system3;

    beforeEach(async () => {
      system1 = systemFactory.createSystem();
      system2 = systemFactory.createSystem();
      system3 = systemFactory.createSystem();

      await systemRepository.save(system1);
      await systemRepository.save(system2);
      await systemRepository.save(system3);
    });

    it('should reject when content-type is not json', async () => {
      const response = await request(app).get('/api/systems');
      expect(response.status).to.eql(415);
      expect(response.text).to.eql('Content-Type must be "application/json"');
    });

    it('should return all system objects', async () => {
      const response = await request(app)
        .get('/api/systems')
        .set('Content-Type', 'application/json');
      expect(response.status).to.eql(200);
      expect(response.text).not.to.eql("");
      const fromServer = JSON.parse(response.text);

      expect(fromServer.data.length).to.eql(3);
      expect(new System(fromServer.data[0].attributes)).to.eql(system1);
      expect(new System(fromServer.data[1].attributes)).to.eql(system2);
      expect(new System(fromServer.data[2].attributes)).to.eql(system3);
    });
  })
});
