import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import { Fabric } from 'office-ui-fabric-react/lib/Fabric';

import { Provider } from 'react-redux';

import Header from './containers/Header';
import GameBoard from './containers/GameBoard';
import Footer from './containers/Footer';

import { createStore } from 'redux';
import { baseReducer } from './reducers/index';
import { StoreState } from './types/index';
import { CreateInitialCells } from './helpers/CellHelpers';

const store = createStore<StoreState>(baseReducer, {
config: {
    selectedIndex: 0,
    selectedValue: 0,
    penMode: true, 
    difficulty: 'Easy', 
    cellDimension: 35,
  }, 
  cells: CreateInitialCells()
});
 
ReactDOM.render(
  <Provider store={store}>
    <Fabric>
      <div>
        <Header /> 
        <GameBoard />
        <Footer />
      </div>
    </Fabric> 
  </Provider>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
