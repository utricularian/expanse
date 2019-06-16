import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../src/App';
import {MemoryRouter} from "react-router-dom";

describe("App", () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><App /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
