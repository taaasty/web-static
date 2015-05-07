import bowser from 'bowser';
global.bowser = bowser;
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
    defaultValue: React.PropTypes.string,
    onChange: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      defaultValue: ''
    };
  },

  componentDidMount() {
    if (!this.canBrowserTriggerChangeEvent()) {
      this.value = this.props.defaultValue;
      this.intervalID = setInterval(this.checkAndTriggerChangeEvent, 1000);
    }
  },

  componentWillUnmount() {
    if (!this.canBrowserTriggerChangeEvent()) {
      clearInterval(this.intervalID);
    }
  },

  render() {
    return <input {...this.props} onChange={this.handleChange} />;
  },

  canBrowserTriggerChangeEvent() {
    let name = bowser.browser.name,
        version = parseFloat(bowser.browser.version);

    return version < MINIMAL_BROWSER_VERSION[name] ? false : true;
  },

  checkAndTriggerChangeEvent() {
    let currentValue = this.getDOMNode().value;
    console.log('currentValue', currentValue);
    if (this.value != currentValue) {
      this.value = currentValue;
      this.props.onChange(currentValue);
    }
  },

  handleChange() {
    let currentValue = this.getDOMNode().value;
    if (!this.canBrowserTriggerChangeEvent()) this.value = currentValue;
    this.props.onChange(currentValue);
  }
});

export default Field;