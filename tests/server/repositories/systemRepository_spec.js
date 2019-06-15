import { expect } from 'chai';

import systemFactory from '../../factories/entities/systemFactory';
import systemRepository from '../../../server/repositories/systemRepository';

describe('SystemRepository', () => {

  describe('#save & #find', () => {
    describe('when the system is brand new', () => {
      it('it returns a promise that resolves to an updated system', async () => {
        const system = systemFactory.createSystem();
        expect(system.id).to.be.undefined;
        expect(system.createdAt).to.be.undefined;

        await systemRepository.save(system);

        expect(system.id).not.to.be.undefined;
        expect(system.createdAt).not.to.be.undefined;
      });

      it('it can find the newly saved system', async () => {
        const system = systemFactory.createSystem();
        await systemRepository.save(system);
        expect(system.id).not.to.be.undefined;

        const fromDb = await systemRepository.find(system.id);
        expect(fromDb).to.eql(system);
      });
    });
  });
});
