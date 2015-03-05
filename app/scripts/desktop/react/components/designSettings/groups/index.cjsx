Scroller = require '../../common/scroller/scroller'
DesignSettingsHeaderGroup = require './headerGroup'
DesignSettingsBackgroundGroup = require './backgroundGroup'
DesignSettingsFeedGroup = require './feedGroup'
{ PropTypes } = React

DesignSettingsGroups = React.createClass
  displayName: 'DesignSettingsGroups'

  propTypes:
    design: PropTypes.object.isRequired
    options: PropTypes.object.isRequired
    onOptionChange: PropTypes.func.isRequired

  render: ->
    <div className="design-settings__groups">
      <Scroller className="scroller--design">
        <DesignSettingsHeaderGroup
            headerFont={ @props.design.headerFont }
            headerSize={ @props.design.headerSize }
            headerColor={ @props.design.headerColor }
            headerFontItems={ @props.options.headerFont }
            headerSizeItems={ @props.options.headerSize }
            headerColorItems={ @props.options.headerColor }
            onOptionChange={ @props.onOptionChange } />
        <DesignSettingsBackgroundGroup
            backgroundColor={ @props.backgroundColor }
            backgroundImageUrl={ @props.backgroundImageUrl }
            backgroundImageEnabled={ @props.backgroundImageEnabled }
            backgroundAlignment={ @props.design.backgroundAlignment }
            backgroundColorItems={ @props.options.backgroundColor }
            backgroundAlignmentItems={ @props.options.backgroundAlignment }
            onOptionChange={ @props.onOptionChange } />
        <DesignSettingsFeedGroup
            feedBackgroundColor={ @props.feedBackgroundColor }
            feedFont={ @preops.feedFont }
            feedFontColor={ @props.feedFontColor }
            feedTransparency={ @props.feedTransparency }
            feedBackgroundColorItems={ @props.options.feedBackgroundColor }
            feedFontItems={ @props.options.feedFont }
            feedFontColorItems={ @props.options.feedFontColor }
            onOptionChange={ @props.onOptionChange } />
      </Scroller>
    </div>

module.exports = DesignSettingsGroups