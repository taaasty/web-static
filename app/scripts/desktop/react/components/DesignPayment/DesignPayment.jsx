import DesignPaymentList from './List/List';
import DesignPaymentProceedButton from './buttons/Proceed';

let DesignPayment = React.createClass({
  propTypes: {
    options: React.PropTypes.object.isRequired,
    onProceed: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="payment">
        <DesignPaymentList options={this.props.options} />
        <DesignPaymentProceedButton onClick={this.props.onProceed} />
      </div>
    );
  }
});

export default DesignPayment;