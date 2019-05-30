import systemFactory from '../../factories/entities/systemFactory';
import systemObjectFactory from '../../factories/entities/systemObjectFactory';
import systemObjectRepository from '../../../server/repositories/systemObjectRepository';
import systemRepository from '../../../server/repositories/systemRepository';

describe('SystemObjectRepository', () => {

  describe('#save', () => {
    describe('when the system is brand new', () => {
      test('it returns a promise that resolves to an updated system', async () => {
        const system = systemFactory.createSystem();
        await systemRepository.save(system);

        const systemObject = systemObjectFactory.createSystemObject({system: system});

        expect(systemObject.id).toBe(undefined);
        expect(systemObject.createdAt).toBe(undefined);

        await systemObjectRepository.save(systemObject);

        expect(systemObject.id).not.toBe(undefined);
        expect(systemObject.createdAt).not.toBe(undefined);
      });
    });
  });

  describe("#findAllBySystemId", function() {
    describe("when the system id does not exist", function() {
      test('it returns an empty array', async () => {
        const systemObjects = await systemObjectRepository.findAllBySystemId(123135);
        expect(systemObjects).toEqual([]);
      });
    });
  });
});
