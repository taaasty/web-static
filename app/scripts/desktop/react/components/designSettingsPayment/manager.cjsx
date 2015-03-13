DesignSettingsPayment = require './index'

DesignSettingsPaymentManager = React.createClass
  displayName: 'DesignSettingsPaymentManager'

  getInitialState: ->
    options:
      headerFont: [
        'proximanova', 'notoserif', 'comfortaa', 'airbornepilot', 'amaranth', 'beermoney'
        'dancingscript', 'greatvibes', 'veles', 'zion', 'nautilus', 'ospdin', 'pecita'
        'poetsen', 'yessireebob'
      ]
      feedFont: [
        'ptsans', 'ptserif', 'roboto', 'lora', 'philosopher', 'ptmono', 'berenisadfpro'
        'djserif', 'heuristica', 'permian', 'robotoslab', 'clearsans'
      ]
      FeedAndHeaderColors: [':ANY:', 'cinnabar', 'silversand', 'bluegray']

  render: ->
    <DesignSettingsPayment
        options={ @state.options }
        onConfirmation={ @redirectToPayment } />
  
  redirectToPayment: ->
    console.log 'redirectToPayment'

module.exports = DesignSettingsPaymentManager