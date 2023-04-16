import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Header from './Header';
import Footer from './Footer';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const header = ReactDOM.createRoot(document.getElementById('header'));
const footer = ReactDOM.createRoot(document.getElementById('footer'));


root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);

header.render(
  <React.StrictMode>
    <Header/>
  </React.StrictMode>
)

footer.render(
  <React.StrictMode>
    <Footer/>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
