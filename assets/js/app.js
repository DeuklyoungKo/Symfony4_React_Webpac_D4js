import React from 'react';
import { render } from 'react-dom';
import Main from './Main';
import '../css/app.css';

render(
  <Main {...window.pageSet}/>,
  document.getElementById('app')
);
