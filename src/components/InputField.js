import React, { Component } from 'react';

class InputField extends Component {
    render() {
        const {label, value, type} = this.props;
        return (
            <div className="form-group">
                <label for={`input-${label}`}>{label}</label>
                <input value={value} label={label} type={type} className="form-control" id={`input-${label}`} aria-describedby="emailHelp" placeholder={`Enter ${label.toLowerCase()}`} />
            </div>
        );
    }
}

export default InputField;