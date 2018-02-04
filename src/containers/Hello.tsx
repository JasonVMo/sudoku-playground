// src/containers/Hello.tsx

import Hello from '../components/Hello';
import * as actions from '../actions/';
import { StoreState } from '../types/index';
import { connect, Dispatch } from 'react-redux';

export function mapStateToProps({ enthusiasm }: StoreState) {
  return {
    enthusiasmLevel: enthusiasm.enthusiasmLevel,
    name: enthusiasm.languageName,
  };
} 

export function mapDispatchToProps(dispatch: Dispatch<actions.CellAction>) {
    return {
        onIncrement: () => dispatch(actions.incrementEnthusiasm()),
        onDecrement: () => dispatch(actions.decrementEnthusiasm()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Hello);