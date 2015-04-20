import SelectBox from '../common/SelectBox/SelectBox';

let SettingsLanguage = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    languages: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="settings__item">
        <div className="settings__right">
          <SelectBox
              value={this.props.value}
              options={this.props.languages}
              withSearchBox={false}
              onSelect={this.handleChange} />
        </div>
        <div className="settings__left">
          <h3 className="settings__title">
            {this.props.title}
          </h3>
        </div>
      </div>
    );
  },

  handleChange(language) {
    this.props.onChange(language);
  }
});

export default SettingsLanguage;