import DesignStore from '../../stores/design';
import CurrentUserStore from '../../stores/current_user';
import DesignActionCreators from '../../actions/design';
import connectToStores from '../../../../shared/react/components/higherOrder/connectToStores';
import DesignPayment from './DesignPayment';

let DesignPaymentContainer = React.createClass({
  propTypes: {
    slug: React.PropTypes.string.isRequired,
    design: React.PropTypes.object.isRequired,
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
    let { slug, design } = this.props;
    DesignActionCreators.proceedPayment(design, slug);
  }
});

DesignPaymentContainer = connectToStores(DesignPaymentContainer, [DesignStore], props => ({
  slug: CurrentUserStore.getUser().slug,
  design: DesignStore.getCurrent(),
  options: DesignStore.getPaymentOptions()
}));

export default DesignPaymentContainer;