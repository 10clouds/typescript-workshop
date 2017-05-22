import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {App} from './App';

require('./styles.css');

const appNode = document.getElementById('app');
ReactDOM.render(<App />, appNode);
