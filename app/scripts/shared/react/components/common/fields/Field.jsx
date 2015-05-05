import bowser from 'bowser';

// These browsers trigger change event on autofill (http://stackoverflow.com/a/11710295)
// Anyway Safari doesn't trigger change event at all
const MINIMAL_BROWSER_VERSION = {
  'Chrome': 9,
  'Firefox': 5,
  'Safari': Infinity,
  'Opera': 15,
  'Internet Explorer': 9
};

let Field = React.createClass({
  propTypes: {
    value: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
  },

  componentDidMount() {
    if (!this.isBrowserCanTriggerChangeEvent()) {
      this.value = this.props.value || '';
      this.intervalID = setInterval(this.checkAndTriggerAutoFillEvent, 20);
    }
  },

  componentWillUnmount() {
    if (!this.isBrowserCanTriggerChangeEvent()) {
      clearInterval(this.intervalID);
    }
  },

  render() {
    return <input type="text" {...this.props} onChange={this.handleChange} />;
  },

  isBrowserCanTriggerChangeEvent() {
    let name = bowser.browser.name,
        version = parseFloat(bowser.browser.version);

    return version < MINIMAL_BROWSER_VERSION[name] ? false : true;
  },

  checkAndTriggerAutoFillEvent() {
    if (this.value != this.getDOMNode().value) this.props.onChange(this.value);
  },

  handleChange(e) {
    if (this.isBrowserCanTriggerChangeEvent()) {
      this.props.onChange(e.target.value);
    } else {
      this.value = e.target.value;
    }
  }
});

export default Field;