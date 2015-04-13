import DesignStore from '../../stores/design';
import DesignActionCreators from '../../actions/design';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import DesignPayment from './DesignPayment';

let DesignPaymentContainer = React.createClass({
  propTypes: {
    options: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <DesignPayment
          options={this.props.options}
          onProceed={this.proceedPayment} />
    );
  },

  proceedPayment() {
    DesignActionCreators.proceedPayment();
  }
});

DesignPaymentContainer = connectToStores(DesignPaymentContainer, [DesignStore], (props) => ({
  options: DesignStore.getPaymentOptions()
}));

export default DesignPaymentContainer;