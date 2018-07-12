import React from 'react';
import ReactDOM from 'react-dom';
import Bikeshare from './Bikeshare';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Bikeshare />, div);
  ReactDOM.unmountComponentAtNode(div);
});
