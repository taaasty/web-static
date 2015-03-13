DesignSettingsPaymentList = require './list/index'
{ PropTypes } = React

DesignSettingsPayment = React.createClass
  displayName: 'DesignSettingsPayment'

  propTypes:
    options: PropTypes.object.isRequired
    onConfirmation: PropTypes.func.isRequired

  render: ->
    <div className="payment">
      <DesignSettingsPaymentList
          options={ @props.options }
          onConfirmation={ @props.onConfirmation } />
    </div>

module.exports = DesignSettingsPayment