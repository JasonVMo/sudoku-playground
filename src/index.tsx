import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

import { Provider } from 'react-redux';

import Header from './containers/Header';
import GameBoard from './containers/GameBoard';

import { createStore } from 'redux';
import { baseReducer } from './reducers/index';
import { StoreState } from './types/index';

const store = createStore<StoreState>(baseReducer, {
  config: {
    selectedIndex: 0,
    penMode: true,
    difficulty: 'Easy',
    cellDimension: 35,
  },
  cellState: {
    value: 3,
    userValue: 0,
    shown: true,
    selected: false
  }
});

ReactDOM.render(
  <Provider store={store}>
    <Fabric>
      <div>
        <Header /> 
        <GameBoard />
      </div>
    </Fabric>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
