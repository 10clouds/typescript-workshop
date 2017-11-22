import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './global.d';
import {App} from './App';

import './styles.css';

const appNode = document.getElementById('app');
ReactDOM.render(<App />, appNode);
