import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Provider } from 'react-redux';

import { createStore } from 'redux';
import { baseReducer } from './reducers/index';
import { StoreState } from './types/index';
import { CreateInitialCells } from './helpers/CellHelpers';
import App from './containers/App';

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
        <App />
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
