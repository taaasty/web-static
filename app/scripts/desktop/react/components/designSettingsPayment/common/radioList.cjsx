_ = require 'lodash'
DesignSettingsPaymentRadio = require './radio'
{ PropTypes } = React

DesignSettingsPaymentRadioList = React.createClass
  displayName: 'DesignSettingsPaymentRadioList'

  propTypes:
    style: PropTypes.string.isRequired
    items: PropTypes.array.isRequired

  render: ->
    listClasses = ['form-radiogroup', 'form-radiogroup--' + @props.style].join ' '

    listItems = _.map @props.items, (item) =>
      <DesignSettingsPaymentRadio
          value={ item }
          custom={ item is ':ANY:' }
          key={ item } />

    return <span className={ listClasses }>
             { listItems}
           </span>

module.exports = DesignSettingsPaymentRadioList