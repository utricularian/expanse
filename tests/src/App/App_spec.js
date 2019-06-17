import React from 'react';
import * as TestUtils from 'react-dom/test-utils';
import {MemoryRouter} from "react-router-dom";

import App from '../../../src/App/App';
import MockSystemsStore from '../mocks/stores/MockSystemsStore';

describe("App", () => {
  it('renders without crashing', () => {
    const systemObjectsStore = jest.fn().mockImplementation(() => {
      return {}
    });
    const router = TestUtils.renderIntoDocument(
      <MemoryRouter>
        <App systemsStore={new MockSystemsStore()} systemObjectsStore={systemObjectsStore}/>
      </MemoryRouter>
    );
    expect(router).not.toEqual(undefined);
  });
});
