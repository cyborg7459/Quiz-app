import React from 'react';
import './option-field.styles.scss';

class OptionField extends React.Component {
    state = {
        bgColor: '#fff'
    }

    render() {
        return (
            <button onClick={() => {
                this.props.optionSelected(this.props.optionValue)
            }} disabled style = {{backgroundColor : this.state.bgColor}} className='option btn-block text-left'>
                <span>{this.props.optionNumber}</span>
                <span className='option-value'>{this.props.optionValue}</span>
            </button>
        )
    }
}

export default OptionField;