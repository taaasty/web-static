import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import Textarea from 'react-textarea-autosize';

class EditableField extends Component {
  state = { focused: false };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.focused && !prevState.focused) {
      const { field } = this.refs;

      field.selectionStart = field.value.length;
      field.selectionEnd = field.value.length;
      this.refs.field.focus();
    }
  }
  handleClick() {
    if (!this.props.withPencil) {
      this.handleFocus();
    }
  }
  handleFocus() {
    this.setState({ focused: true });
  }
  handleBlur() {
    this.setState({ focused: false });
    if (this.props.onBlur) {
      this.props.onBlur();
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
    const { maxLength, placeholder, value: rawValue, withPencil } = this.props;
    const value = rawValue || '';
    const fieldClasses = classNames('editable-field', {
      'state--empty': value.trim() === '',
      'state--focus': this.state.focused,
    });

    return (
      <div className={fieldClasses} onClick={this.handleClick.bind(this)}>
        <div className="editable-field__control-wrap">
          <Textarea
            className="editable-field__control"
            maxLength={maxLength}
            onBlur={this.handleBlur.bind(this)}
            onChange={this.handleChange.bind(this)}
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
             <span className="editable-field__button" onClick={this.handleFocus.bind(this)}>
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
