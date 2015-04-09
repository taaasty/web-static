let DesignPaymentProceedButton = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <button className="payment__button" onClick={this.handleClick}>
        Перейти к оплате
      </button>
    );
  },

  handleClick() {
    this.props.onClick();
  }
});

export default DesignPaymentProceedButton;