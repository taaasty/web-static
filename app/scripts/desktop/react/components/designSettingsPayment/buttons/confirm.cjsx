{ PropTypes } = React

DesignSettingsPaymentConfirmButton = React.createClass
  displayName: 'DesignSettingsPaymentConfirmButton'

  propTypes:
    onClick: PropTypes.func.isRequired

  render: ->
    <button className="payment__button"
            onClick={ @handleClick }>
      Перейти к оплате
    </button>

  handleClick: ->
    @props.onClick()

module.exports = DesignSettingsPaymentConfirmButton