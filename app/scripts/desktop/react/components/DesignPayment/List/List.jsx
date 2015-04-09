import DesignSettingsSlider from '../../DesignSettings/common/slider';
import DesignPaymentRadioList from '../common/RadioList';
import DesignPaymentListItem from './ListItem';

let DesignPaymentList = React.createClass({
  propTypes: {
    options: React.PropTypes.object.isRequired
  },

  render() {
    return (
      <ul className="payment__list">
        <DesignPaymentListItem title={i18n.t('design_payment_header_font_title')}>
          <DesignSettingsSlider>
            <DesignPaymentRadioList
                style="font"
                items={this.props.options.headerFont} />
          </DesignSettingsSlider>
        </DesignPaymentListItem>

        <DesignPaymentListItem title={i18n.t('design_payment_feed_font_title')}>
          <DesignSettingsSlider>
            <DesignPaymentRadioList
                style="font"
                items={this.props.options.feedFont} />
          </DesignSettingsSlider>
        </DesignPaymentListItem>

        <DesignPaymentListItem title={i18n.t('design_payment_feed_and_header_colors_title')}>
          <DesignPaymentRadioList
              style="circlebtns"
              items={this.props.options.feedAndHeaderColors} />
        </DesignPaymentListItem>

        <DesignPaymentListItem title={i18n.t('design_payment_terms_title')}>
          {i18n.t('design_payment_terms_description')}
        </DesignPaymentListItem>

        <DesignPaymentListItem title={i18n.t('design_payment_cost_title')}>
          {i18n.t('design_payment_cost_description')}
        </DesignPaymentListItem>

        <DesignPaymentListItem title={i18n.t('design_payment_payment_methods_title')}>
          {i18n.t('design_payment_payment_methods_description')}
        </DesignPaymentListItem>
      </ul>
    );
  }
});

export default DesignPaymentList;