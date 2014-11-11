###* @jsx React.DOM ###

window.DesignSettingsPopup_Controls = React.createClass

  propTypes:
    design:              React.PropTypes.object.isRequired
    userId:              React.PropTypes.number.isRequired
    activitiesHandler:   React.PropTypes.object.isRequired
    saveCallback:        React.PropTypes.func.isRequired
    onBackgroundChanged: React.PropTypes.func.isRequired

  shouldComponentUpdate: (nextProps) ->
    !_.isEqual @props.design, nextProps.design

  render: ->
    saveCallback = -> @props.saveCallback.apply @, arguments

    return `<div className="settings-design__controls">
              <DesignSettingsPopup_ControlsBackgroundItem userId={ this.props.userId }
                                                          backgroundUrl={ this.props.design.background_url }
                                                          activitiesHandler={ this.props.activitiesHandler }
                                                          onBackgroundChanged={ this.props.onBackgroundChanged } />

              <DesignSettingsPopup_ControlsAlignItem coverAlign={ this.props.design.coverAlign }
                                                     saveCallback={ saveCallback.bind(this, 'coverAlign') } />

              <DesignSettingsPopup_ControlsHeaderColorItem headerColor={ this.props.design.headerColor }
                                                           saveCallback={ saveCallback.bind(this, 'headerColor') } />

              <DesignSettingsPopup_ControlsFeedColorItem feedColor={ this.props.design.feedColor }
                                                         saveCallback={ saveCallback.bind(this, 'feedColor') } />

              <DesignSettingsPopup_ControlsFontTypeItem fontType={ this.props.design.fontType }
                                                        saveCallback={ saveCallback.bind(this, 'fontType') } />

              <DesignSettingsPopup_ControlsOpacityItem feedOpacity={ this.props.design.feedOpacity }
                                                       saveCallback={ saveCallback.bind(this, 'feedOpacity') } />
            </div>`