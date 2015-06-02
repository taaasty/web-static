import classnames from 'classnames';
import Textarea from 'react-textarea-autosize';

let EditableField = React.createClass({
  propTypes: {
    maxLength: React.PropTypes.number,
    defaultValue: React.PropTypes.string,
    returnFor: React.PropTypes.oneOf(['blur', 'nextLine']),
    onChange: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      maxLength: 140,
      defaultValue: '',
      returnFor: 'nextLine'
    };
  },

  getInitialState() {
    return {
      value: this.props.defaultValue,
      focused: false
    };
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.state.focused && prevState.focused != this.state.focused) {
      // Ставим курсор в конец
      let field = React.findDOMNode(this.refs.field);
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
      <div className={fieldClasses}>
        <div className="editable-field__control-wrap">
          <Textarea
              ref="field"
              maxLength={this.props.maxLength}
              defaultValue={this.props.defaultValue}
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
          <span className="editable-field__button" onClick={this.handleButtonClick}>
            <i className="icon icon--pencil" />
          </span>
       </div>
     </div>
    );
  },

  handleButtonClick() {
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
      React.findDOMNode(this.refs.field).blur();
      if (this.props.onChange) this.props.onChange(e.target.value);
    }
  }
});

export default EditableField;