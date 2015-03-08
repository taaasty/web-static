_ = require 'lodash'
DesignPresenterService = require '../../../services/designPresenter'
DesignSettingsRadio = require './radio'
{ PropTypes } = React

DesignSettingsRadioList = React.createClass
  displayName: 'DesignSettingsRadioList'

  propTypes:
    style: PropTypes.string.isRequired
    optionName: PropTypes.string.isRequired
    value: PropTypes.string.isRequired
    items: PropTypes.array.isRequired
    className: PropTypes.string
    onChange: PropTypes.func.isRequired

  render: ->
    listClasses = ['form-radiogroup', 'form-radiogroup--' + @props.style, @props.className].join ' '
    listItems = _.map @props.items, (item) =>
      <DesignSettingsRadio
          value={ item }
          checked={ @props.value is item }
          optionName={ @props.optionName }
          onChange={ @props.onChange }
          key={ item } />

    return <span className={ listClasses }>
             { listItems}
           </span>

module.exports = DesignSettingsRadioList