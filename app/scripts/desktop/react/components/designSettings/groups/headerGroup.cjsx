DesignSettingsGroup = require './group'
DesignSettingsOption = require '../option/index'
DesignSettingsOptionState = require '../option/state'
DesignSettingsSlider = require '../common/slider'
DesignSettingsRadioList = require '../common/radioList'
{ PropTypes } = React

DesignSettingsHeaderGroup = React.createClass
  displayName: 'DesignSettingsHeaderGroup'

  propTypes:
    headerFont: PropTypes.string.isRequired
    headerSize: PropTypes.string.isRequired
    headerColor: PropTypes.string.isRequired
    headerFontItems: PropTypes.array.isRequired
    headerSizeItems: PropTypes.array.isRequired
    headerColorItems: PropTypes.array.isRequired
    onOptionChange: PropTypes.func.isRequired

  render: ->
    <DesignSettingsGroup title="Заголовок">
      <DesignSettingsOption title="Шрифт" name="headerfont">
        <DesignSettingsOptionState style="font" text="Aa" />
        <DesignSettingsSlider>
          <DesignSettingsRadioList
              style="font"
              optionName="headerFont"
              value={ @props.headerFont }
              items={ @props.headerFontItems }
              onChange={ @props.onOptionChange.bind(null, 'headerFont') } />
        </DesignSettingsSlider>
      </DesignSettingsOption>

      <DesignSettingsOption title="Размер" name="headersize">
        <DesignSettingsRadioList
            style="dotted"
            optionName="headerSize"
            value={ @props.headerSize }
            items={ @props.headerSizeItems }
            className="ds-absolute-left ds-fadein-down"
            onChange={ @props.onOptionChange.bind(null, 'headerSize') } />
      </DesignSettingsOption>

      <DesignSettingsOption title="Цвет" name="headercolor">
        <DesignSettingsOptionState style="circlebtn" />
        <DesignSettingsRadioList
            style="circlebtns"
            optionName="headerColor"
            value={ @props.headerColor }
            items={ @props.headerColorItems }
            className="ds-absolute-left ds-fadein-down"
            onChange={ @props.onOptionChange.bind(null, 'headerColor') } />
      </DesignSettingsOption>
    </DesignSettingsGroup>

module.exports = DesignSettingsHeaderGroup