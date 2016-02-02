let DesignPaymentProceedButton = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <button className="payment__button" onClick={this.handleClick}>
        {i18n.t('design_payment_proceed_button')}
      </button>
    );
  },

  handleClick() {
    this.props.onClick();
  }
});

export default DesignPaymentProceedButton;