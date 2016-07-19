import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import Textarea from 'react-textarea-autosize';

class EditableField extends Component {
  focus() {
    this.refs.field.focus();
  }
  handleFocus() {
    const field = this.refs.field;

    if (typeof field.selectionStart !== 'undefined' &&
        typeof field.selectionEnd !== 'undefined') {
      const len = field.value.length * 2;
      field.selectionStart = len;
      field.selectionEnd = len;
    }
  }
  handleChange(ev) {
    const { value } = ev.target;

    if (this.props.onChange) {
      this.props.onChange(value);
    }
  }
  handleKeyDown(ev) {
    if (ev.key === 'Enter') {
      ev.preventDefault();
      this.refs.field.blur();
      if (this.props.onSave) {
        this.props.onSave(ev.target.value);
      }
    }
  }
  render() {
    const { maxLength, onBlur, placeholder, value, withPencil } = this.props;
    const fieldClasses = classnames('editable-field', {
      'state--empty': value.trim() === '',
    });

    return (
      <div className={fieldClasses}>
        <div className="editable-field__control-wrap">
          <Textarea
            className="editable-field__control"
            maxLength={maxLength}
            onBlur={onBlur}
            onChange={this.handleChange.bind(this)}
            onFocus={this.handleFocus.bind(this)}
            onKeyDown={this.handleKeyDown.bind(this)}
            placeholder={placeholder}
            ref="field"
            value={value}
          />
        </div>
        <div className="editable-field__content">
          <span className="editable-field__placeholder">
            {placeholder}
          </span>
          <span className="editable-field__value">
            {value}
          </span>
          {withPencil && (
             <span className="editable-field__button" onClick={this.focus.bind(this)}>
               <i className="icon icon--pencil" />
             </span>
          )}
        </div>
      </div>
    );
  }
}

EditableField.propTypes = {
  maxLength: PropTypes.number,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onSave: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  withPencil: PropTypes.bool.isRequired,
};

EditableField.defaultProps = {
  maxLength: 140,
  value: '',
  withPencil: false,
};

export default EditableField;
