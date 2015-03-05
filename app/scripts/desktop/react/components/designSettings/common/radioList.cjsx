_ = require 'lodash'
DesignPresenterService = require '../../../services/designPresenter'
DesignSettingsRadio = require './radio'
{ PropTypes } = React

DesignSettingsRadioList = React.createClass
  displayName: 'DesignSettingsRadioList'

  propTypes:
    style: PropTypes.string.isRequired
    optionName: PropTypes.string.isRequired
    items: PropTypes.array.isRequired
    className: PropTypes.string
    onChange: PropTypes.func.isRequired

  render: ->
    listClasses = ['form-radiogroup', 'form-radiogroup--' + @props.style, @props.className].join ' '
    listItems = _.map @props.items, (item) =>
      <DesignSettingsRadio
          value={ item }
          optionName={ @props.optionName }
          title={ DesignPresenterService.getTitle(@props.optionName, item) }
          onChange={ @props.onChange }
          key={ item.value } />

    return <span className={ listClasses }>
             { listItems}
           </span>

module.exports = DesignSettingsRadioList