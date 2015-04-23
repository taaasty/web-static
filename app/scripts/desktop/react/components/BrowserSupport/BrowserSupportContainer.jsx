import bowser from 'bowser';
import BrowserSupport from './BrowserSupport';

// Incompatable browser versions:
// * Opera < 15

const UPDATE_URLS = {
  Opera: 'http://www.opera.com/download'
};

let BrowserSupportContainer = React.createClass({
  getInitialState() {
    return {
      name: null,
      version: null,
      updateUrl: null,
      incompatable: null
    };
  },

  componentDidMount() {
    // Показываем через секунду, чтобы страница успела прогрузиться и показалась
    // анимация и тд.
    setTimeout(this.checkCompatability, 1000);
  },

  checkCompatability() {
    let name = bowser.browser.name,
        version = parseFloat(bowser.browser.version),
        incompatable = null,
        updateUrl = null;

    if (name === 'Opera' && version < 15) {
      incompatable = true;
      updateUrl = UPDATE_URLS[name];
    } else {
      incompatable = false;
    }

    if (incompatable) {
      ReactApp.layoutStatesController.toggleState('browserIncompatable', true);
    }

    this.setState({name, version, incompatable, updateUrl});
  },

  render() {
    if (this.state.incompatable) {
      return (
        <BrowserSupport 
            name={this.state.name}
            version={this.state.version}
            updateUrl={this.state.updateUrl} />
      );
    } else {
      return null;
    }
  }
});

export default BrowserSupportContainer;