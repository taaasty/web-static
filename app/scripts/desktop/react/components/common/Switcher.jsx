import {Component, PropTypes} from 'react';

export default class Switcher extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    checked: PropTypes.bool.isRequired,
    labelOn: PropTypes.string,
    labelOff: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  };
  render() {
    return (
      <div className="switcher">
        <input
          type="checkbox"
          checked={this.props.checked}
          id={this.props.id}
          className="switcher__input"
          onChange={this.handleChange.bind(this)}
        />
        <label htmlFor={this.props.id} className="switcher__label">
          <span className="switcher__btn switcher__btn--on">
            {this.props.labelOn || i18n.t('switcher.label_on')}
          </span>
          <span className="switcher__btn switcher__btn--off">
            {this.props.labelOff || i18n.t('switcher.label_off')}
          </span>
        </label>
      </div>
    );
  }
  handleChange(e) {
    this.props.onChange(e.target.checked);
  }
}
