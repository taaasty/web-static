DesignSettingsGroup       = require './Group'
DesignSettingsOption      = require '../option/index'
DesignSettingsOptionState = require '../option/state'
DesignSettingsSlider      = require '../common/slider'
DesignSettingsRadioList   = require '../common/radioList'
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
      <DesignSettingsOption
          name="headerfont"
          title="Шрифт">
        <DesignSettingsOptionState
            style="font"
            text="Aa" />
        <DesignSettingsSlider>
          <DesignSettingsRadioList
              style="font"
              optionName="headerFont"
              value={ @props.headerFont }
              items={ @props.headerFontItems }
              onChange={ @props.onOptionChange.bind(null, 'headerFont') } />
        </DesignSettingsSlider>
      </DesignSettingsOption>

      <DesignSettingsOption
          name="headersize"
          title="Размер">
        <DesignSettingsRadioList
            style="dotted"
            optionName="headerSize"
            items={ @props.headerSizeItems }
            className="ds-absolute-left ds-fadein-down"
            onChange={ @props.onOptionChange.bind(null, 'headerSize') } />
      </DesignSettingsOption>

      <DesignSettingsOption
          name="headercolor"
          title="Цвет">
        <DesignSettingsOptionState style="circlebtn" />
        <DesignSettingsRadioList
            style="circlebtns"
            optionName="headerColor"
            items={ @props.headerColorItems }
            className="ds-absolute-left ds-fadein-down"
            onChange={ @props.onOptionChange.bind(null, 'headerColor') } />
      </DesignSettingsOption>
    </DesignSettingsGroup>

module.exports = DesignSettingsHeaderGroup