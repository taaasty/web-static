import DesignSettingsColorPicker from '../../DesignSettings/common/colorPicker';

let DesignPaymentRadioListItem = React.createClass({
  propTypes: {
    value: React.PropTypes.string.isRequired,
    custom: React.PropTypes.bool.isRequired
  },

  render() {
    let name = this.props.custom ? 'custom' : this.props.value;

    return (
      <span className={`form-radiobtn form-radiobtn--${name}`}>
        <label className="form-radiobtn__label">
          <span className="form-radiobtn__inner">
            <span className="form-radiobtn__text">Aa</span>
          </span>
          {this.renderColorPicker()}
        </label>
      </span>
    );
  },

  renderColorPicker() {
    if (this.props.custom) {
      return <DesignSettingsColorPicker />;
    }
  }
});

export default DesignPaymentRadioListItem;