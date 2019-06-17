import SystemsStore from '../../../src/stores/SystemsStore';
import ApiRequest from '../../../src/helpers/ApiRequest';

import systemFactory from '../../factories/entities/systemFactory';

jest.mock('../../../src/helpers/ApiRequest');

describe('SystemsStore', () => {
  let makeRequestMock;
  let store;

  beforeEach(() => {
    ApiRequest.mockClear();
    makeRequestMock = jest.fn().mockImplementation(() => {
      return Promise.resolve({data: []});
    });

    ApiRequest.mockImplementation(() => {
      return {
        makeRequest: makeRequestMock
      };
    });

    store = new SystemsStore({apiRequest: new ApiRequest()});
  });

  describe("#findAll", () => {
    it('makes an API call', () => {
      let makeRequestMockCalls = makeRequestMock.mock.calls;
      expect(makeRequestMockCalls.length).toEqual(0);

      store.findAll();

      expect(makeRequestMockCalls.length).toEqual(1);
      const url = makeRequestMockCalls[0][0];
      expect(url).toEqual('/api/v1/systems');
    });

    describe("when the API call fails", () => {
      beforeEach(() => {
        makeRequestMock = jest.fn().mockImplementation(() => {
          return Promise.reject({error: 'to be expected'});
        });

        store = new SystemsStore({apiRequest: new ApiRequest()});
      });

      it('logs to console.error and returns an empty array', async () => {
        const fromServer = await store.findAll();
        expect(fromServer.length).toEqual(0);

        // TODO test logger
      });
    });

    describe("when the API call returns", () => {
      let system1, system2;
      let systemAttributes1, systemAttributes2;

      beforeEach(() => {
        system1 = systemFactory.createSystem({});
        system2 = systemFactory.createSystem();

        systemAttributes1 = JSON.parse(JSON.stringify(system1));
        systemAttributes2 = JSON.parse(JSON.stringify(system2));

        makeRequestMock = jest.fn().mockImplementation(() => {
          return Promise.resolve({data: [{attributes: systemAttributes1}, {attributes: systemAttributes2}]});
        });

        store = new SystemsStore({apiRequest: new ApiRequest()});
      });

      it('sets internal systems to the array of System objects', async () => {
        const fromServer = await store.findAll();
        expect(fromServer.length).toEqual(2);
        expect(fromServer[0]).toEqual(system1);
        expect(fromServer[1]).toEqual(system2);
      });
    });
  });
});
