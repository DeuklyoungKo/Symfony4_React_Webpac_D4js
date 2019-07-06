import React from 'react';
import { render } from 'react-dom';
import Main from './Main';


let fatchLink = "";

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
  console.log("development");
  fatchLink = "http://reactjs.test.com:8080/build/manifest.json";
} else {
  // production code
  console.log("production");
  fatchLink = "http://reactjs.test.com/build/manifest.json";
}




render(
  <Main
      fatchLink={fatchLink}
  />,
  document.getElementById('app')
);
