import React from 'react';
import ReactDOM from 'react-dom';
import * as TestUtils from 'react-dom/test-utils';

import Home from "../../src/Home";

import MockSystemsStore from './mocks/stores/MockSystemsStore';

describe("Home", () => {
  let home, homeNode, systemsStore, systemObjectsStore, loginCallback;

  beforeEach(() => {
    systemsStore = new MockSystemsStore();
    systemObjectsStore = jest.fn().mockImplementation(() => {
      return {};
    });
    loginCallback = jest.fn();

    home = TestUtils.renderIntoDocument(
      <Home systemsStore={systemsStore} systemObjectsStore={systemObjectsStore} loginCallback={loginCallback}/>
    );
    homeNode = ReactDOM.findDOMNode(home);
  });

  it('initializes with a rendered GlobalStats', () => {
    expect(homeNode.textContent).toMatch(/Global Stats/);
    expect(homeNode.textContent).not.toMatch(/Username:/);
  });

  describe("after closing Global Stats", () => {
    beforeEach(() => {
      TestUtils.Simulate.click(
        TestUtils.findRenderedDOMComponentWithTag(home, 'a')
      );
    });

    it('should no longer display Global Stats', () => {
      expect(homeNode.textContent).not.toMatch(/Global Stats/);
    });

    it('should prompt the user to enter their username', () => {
      expect(homeNode.textContent).toMatch(/Username:/);
    });

    describe("after submitting a username", () => {
      const username = 'MyUsername';

      beforeEach(() => {
        expect(loginCallback).toHaveBeenCalledTimes(0);

        const inputDOMElement = TestUtils.findRenderedDOMComponentWithTag(home, 'input');
        TestUtils.Simulate.change(inputDOMElement, {target: {value: username}});

        expect(home.state.username).toEqual(username);

        TestUtils.Simulate.keyDown(inputDOMElement, {key: 'Enter', keyCode: 13, which: 13});
      });

      it('should call login callback with username', () => {
        expect(loginCallback).toHaveBeenCalledTimes(1);

        expect(loginCallback).toHaveBeenCalledWith(username);
      });
    });
  });
});
