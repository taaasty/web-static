let FlowFormAddress = React.createClass({
  propTypes: {
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <label className="form-field-label">
        <div className="form-field form-field--default form-field--binary">
          <div className="form-field__text">http://taaasty.com/<span className="tilde">~</span></div>
          <div className="form-field__box">
            <input type="text"
                   value={this.props.value}
                   placeholder="адрес потока"
                   className="form-field__input"
                   onChange={this.handleChange} />
          </div>
          <div className="form-field__bg"></div>
        </div>
      </label>
    );
  },

  handleChange(e) {
    let value = e.target.value.replace(/[^\x00-\x7F]/g, '');
    if (e.target.value == value) {
      this.props.onChange(e.target.value);
    }
  }
});

export default FlowFormAddress;