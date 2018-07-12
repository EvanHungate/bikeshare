import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Bikeshare from './Bikeshare';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Bikeshare />, document.getElementById('root'));
registerServiceWorker();
