import systemFactory from '../../factories/entities/systemFactory';
import systemRepository from '../../../server/repositories/systemRepository';

describe('SystemRepository', () => {

  describe('#save & #find', () => {
    describe('when the system is brand new', () => {
      test('it returns a promise that resolves to an updated system', async () => {
        const system = systemFactory.createSystem();
        expect(system.id).toBe(undefined);
        expect(system.createdAt).toBe(undefined);

        await systemRepository.save(system);

        expect(system.id).not.toBe(undefined);
        expect(system.createdAt).not.toBe(undefined);
      });

      test('it can find the newly saved system', async () => {
        const system = systemFactory.createSystem();
        await systemRepository.save(system);
        expect(system.id).not.toBe(undefined);

        const fromDb = await systemRepository.find(system.id);
        expect(fromDb).toEqual(system);
      })
    });
  });
});
