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
        <DesignPaymentListItem title="14 новых шрифтов заголовков">
          <DesignSettingsSlider>
            <DesignPaymentRadioList
                style="font"
                items={this.props.options.headerFont} />
          </DesignSettingsSlider>
        </DesignPaymentListItem>

        <DesignPaymentListItem title="12 новых шрифтов тлога">
          <DesignSettingsSlider>
            <DesignPaymentRadioList
                style="font"
                items={this.props.options.feedFont} />
          </DesignSettingsSlider>
        </DesignPaymentListItem>

        <DesignPaymentListItem title="Любые цвета ленты, шрифта, заголовка">
          <DesignPaymentRadioList
              style="circlebtns"
              items={this.props.options.feedAndHeaderColors} />
        </DesignPaymentListItem>

        <DesignPaymentListItem title="Условия">
          Вы платите всего один раз и возможности настройки дизайна остаются с Вами навсегда
        </DesignPaymentListItem>

        <DesignPaymentListItem title="Стоимость">
          299 рублей
        </DesignPaymentListItem>

        <DesignPaymentListItem title="Способы оплаты<br /> (без комиссии)">
          Со счета мобильного телефона, банковской картой, через терминалы, салоны связи, яндекс.деньги, веб-мани
        </DesignPaymentListItem>
      </ul>
    );
  }
});

export default DesignPaymentList;