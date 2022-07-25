import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './Styling/fontawesome';
import reportWebVitals from './reportWebVitals';
import './Fonts/Dosis/Dosis-Bold.ttf';
import './Fonts/Dosis/Dosis-Regular.ttf';
import './Fonts/Dosis/Dosis-Light.ttf';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import middleware from './middleware'
import { loadState,saveState } from './loadStorage';
const persistedState = loadState();
const store = createStore(reducer, persistedState, middleware)
store.subscribe(()=>{
  saveState({
    autheduser:store.getState().autheduser
  }
    );
});
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
