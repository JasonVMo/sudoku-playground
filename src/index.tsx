import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

import Hello from './containers/Hello';
import { Provider } from 'react-redux';

import Cell from './components/Cell';
import Header from './containers/Header';

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
  enthusiasm: {
    enthusiasmLevel: 1,
    languageName: 'TypeScript',  
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
        <Hello />
        <Cell index={0} />
      </div>
    </Fabric>
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
