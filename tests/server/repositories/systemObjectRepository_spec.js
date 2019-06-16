import { expect } from 'chai';

import systemFactory from '../../factories/entities/systemFactory';
import systemObjectFactory from '../../factories/entities/systemObjectFactory';
import systemObjectRepository from '../../../server/repositories/systemObjectRepository';
import systemRepository from '../../../server/repositories/systemRepository';

describe('SystemObjectRepository', () => {
  describe('#save', () => {
    describe('when the system is brand new', () => {
      it('it returns a promise that resolves to an updated system', async () => {
        const system = systemFactory.createSystem();
        await systemRepository.save(system);

        const systemObject = systemObjectFactory.createSystemObject({system: system});

        expect(systemObject.id).to.be.undefined;
        expect(systemObject.createdAt).to.be.undefined;

        await systemObjectRepository.save(systemObject);

        expect(systemObject.id).not.to.be.undefined;
        expect(systemObject.createdAt).not.to.be.undefined;
      });
    });
  });

  describe("#findAllBySystemId", () => {
    let system, object1, object2, object3;

    beforeEach(async () => {
      system = systemFactory.createSystem();
      await systemRepository.save(system);

      object1 = systemObjectFactory.createSystemObject({system: system, radiansFromSystemGate: 0.0});
      object2 = systemObjectFactory.createSystemObject({system: system, radiansFromSystemGate: 2.0});
      object3 = systemObjectFactory.createSystemObject({system: system, radiansFromSystemGate: 1.0});

      await systemObjectRepository.save(object1);
      await systemObjectRepository.save(object2);
      await systemObjectRepository.save(object3);
    });

    describe("when the system id does not exist", () => {
      it('it returns an empty array', async () => {
        const systemObjects = await systemObjectRepository.findAllBySystemId(system.id + 1);
        expect(systemObjects).to.eql([]);
      });
    });

    describe("when the system has objects in it", () => {
      it('returns the list of system objects in order of radians', async () => {
        const systemObjects = await systemObjectRepository.findAllBySystemId(system.id);
        expect(systemObjects).to.eql([object1, object3, object2]);
      });
    });
  });
});
