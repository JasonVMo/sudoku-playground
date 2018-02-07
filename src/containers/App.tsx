// App.tsx - general app container

import * as React from 'react';
import * as actions from '../actions/';
import { connect, Dispatch } from 'react-redux';
import Header from '../containers/Header';
import GameBoard from '../containers/GameBoard';
import Footer from '../containers/Footer';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { StoreState } from '../types/index';

export interface Props {
    penMode: boolean;
    difficulty: string;
    handleKeyPress?: (event: React.KeyboardEvent<EventTarget>) => void;
}

function App({penMode = false, difficulty = 'Easy', handleKeyPress}: Props) {    
    return (
        <Fabric>
            <div 
                tabIndex={0}
                onKeyPress={(event: React.KeyboardEvent<EventTarget>) => { 
                    if (handleKeyPress) { handleKeyPress(event); }}
                }
            >
                <Header /> 
                <GameBoard />
                <Footer />
            </div>
        </Fabric>
    );
}

export function mapStateToProps({ config }: StoreState) {
    return {
        penMode: config.penMode,
        difficulty: config.difficulty
    };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.CellAction>) {
    return {
        handleKeyPress: (event: React.KeyboardEvent<EventTarget>) => { 
            if (event.charCode >= 49 && event.keyCode <= 57) {
                dispatch(actions.cmdButtonClick('NumPress', event.key)); 
            }
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
