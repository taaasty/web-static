DesignSettingsSlider = require '../../designSettings/common/slider'
DesignSettingsPaymentRadioList = require '../common/radioList'
DesignSettingsPaymentListItem = require './item'
DesignSettingsPaymentConfirmButton = require '../buttons/confirm'
{ PropTypes } = React

DesignSettingsPaymentList = React.createClass
  displayName: 'DesignSettingsPaymentList'

  propTypes:
    options: PropTypes.object.isRequired
    onConfirmation: PropTypes.func.isRequired

  render: ->
    <div>
      <ul className="payment__list">
        <DesignSettingsPaymentListItem title="14 новых шрифтов заголовков">
          <DesignSettingsSlider>
            <DesignSettingsPaymentRadioList
                style="font"
                items={ @props.options.headerFont } />
          </DesignSettingsSlider>
        </DesignSettingsPaymentListItem>

        <DesignSettingsPaymentListItem title="12 новых шрифтов тлога">
          <DesignSettingsSlider>
            <DesignSettingsPaymentRadioList
                style="font"
                items={ @props.options.feedFont } />
          </DesignSettingsSlider>
        </DesignSettingsPaymentListItem>

        <DesignSettingsPaymentListItem title="Любые цвета ленты, шрифта, заголовка">
          <DesignSettingsPaymentRadioList
              style="circlebtns"
              items={ @props.options.FeedAndHeaderColors } />
        </DesignSettingsPaymentListItem>

        <DesignSettingsPaymentListItem title="Условия">
          Вы платите всего один раз и возможности настройки дизайна остаются с Вами навсегда
        </DesignSettingsPaymentListItem>

        <DesignSettingsPaymentListItem title="Стоимость">
          299 рублей
        </DesignSettingsPaymentListItem>

        <DesignSettingsPaymentListItem title="Способы оплаты<br /> (без комиссии)">
          Со счета мобильного телефона, банковской картой, через терминалы, салоны связи, яндекс.деньги, веб-мани
        </DesignSettingsPaymentListItem>
      </ul>
      <DesignSettingsPaymentConfirmButton onClick={ @props.onConfirmation } />
    </div>

module.exports = DesignSettingsPaymentList