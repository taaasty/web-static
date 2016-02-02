import React, { createClass, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import classnames from 'classnames';
import Textarea from 'react-textarea-autosize';

let EditableField = createClass({
  propTypes: {
    defaultValue: PropTypes.string,
    maxLength: PropTypes.number,
    onChange: PropTypes.func,
    returnFor: PropTypes.oneOf(['blur', 'nextLine']),
    value: PropTypes.string,
  },

  getDefaultProps() {
    return {
      maxLength: 140,
      returnFor: 'nextLine',
    };
  },

  getInitialState() {
    return {
      value: this.props.value || this.props.defaultValue || '',
      focused: false
    };
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.state.focused && prevState.focused != this.state.focused) {
      // Ставим курсор в конец
      let field = findDOMNode(this.refs.field);
      if (field.setSelectionRange) {
        let len = field.value.length * 2;
        field.setSelectionRange(len, len);
        field.focus();
      } else {
        field.value = field.value;
        field.focus();
      }
    }
  },

  render() {
    let fieldClasses = classnames('editable-field', {
      'state--empty': this.state.value.trim() === '',
      'state--focus': this.state.focused
    });

    return (
      <div className={fieldClasses} onClick={this.handleClick}>
        <div className="editable-field__control-wrap">
          <Textarea
              ref="field"
              maxLength={this.props.maxLength}
              value={this.state.value}
              placeholder={this.props.placeholder}
              className="editable-field__control"
              onBlur={this.handleBlur}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown} />
        </div>
        <div className="editable-field__content">
          <span className="editable-field__placeholder">
            {this.props.placeholder}
          </span>
          <span className="editable-field__value">
            {this.state.value}
          </span>
       </div>
     </div>
    );
  },

  handleClick() {
    this.setState({focused: true});
  },

  handleBlur() {
    this.setState({focused: false});
  },

  handleChange(e) {
    let { value } = e.target;

    this.setState({value});
    if (this.props.onChange) this.props.onChange(value);
  },

  handleKeyDown(e) {
    if (e.key === 'Enter' && this.props.returnFor === 'blur') {
      e.preventDefault();
      findDOMNode(this.refs.field).blur();
      if (this.props.onChange) this.props.onChange(e.target.value);
    }
  }
});

export default EditableField;
