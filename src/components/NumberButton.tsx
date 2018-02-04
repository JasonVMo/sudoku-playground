import * as React from 'react';
// import * as actions from '../actions/';
// import { Dispatch } from 'react-redux';

export interface Props {
    value: number;
    onNumButtonClicked: (value: number) => void;
}

class NumberButton extends React.Component<Props, object> {
    render() {
        const value: number = this.props.value;
        const onNumButtonClicked: (value: number) => void = this.props.onNumButtonClicked;

        const buttonStyle = {
            marginLeft: '25px',
            marginRight: '25px',
            fontSize: '40px',
            minWidth: '50px',
            minHeight: '50px'
        };

        return (
            <button style={buttonStyle} onClick={onClickNumButton}>value</button>
        );

        function onClickNumButton() {
            onNumButtonClicked(value);
        }
    }
}

export default NumberButton;