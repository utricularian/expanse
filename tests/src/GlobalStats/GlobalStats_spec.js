import React from 'react';
import ReactDOM from "react-dom";
import * as TestUtils from 'react-dom/test-utils';

import GlobalStats from "../../../src/GlobalStats/GlobalStats";
import MockSystemsStore from '../mocks/stores/MockSystemsStore';

import systemFactory from '../../factories/entities/systemFactory';

describe("GlobalStats", () => {
  let system1, system2;

  beforeEach(() => {
    system1 = systemFactory.createSystem();
    system2 = systemFactory.createSystem();
  });

  it('displays the current number of systems', async () => {
    const systemsStore = new MockSystemsStore({mockData: [system1, system2]});
    const stats = TestUtils.renderIntoDocument(
      <GlobalStats systemsStore={systemsStore} />
    );
    const statsNode = ReactDOM.findDOMNode(stats);

    await systemsStore._findAllPromise;

    expect(statsNode.textContent).toMatch(/Number of Systems: 2/);
  });
});
