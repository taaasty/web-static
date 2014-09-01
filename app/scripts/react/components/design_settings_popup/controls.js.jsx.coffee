###* @jsx React.DOM ###

window.DesignSettingsPopup_Controls = React.createClass

  propTypes:
    design:            React.PropTypes.object.isRequired
    slug:              React.PropTypes.string.isRequired
    activitiesHandler: React.PropTypes.object.isRequired
    saveCallback:      React.PropTypes.func.isRequired

  shouldComponentUpdate: (nextProps) ->
    !_.isEqual @props.design, nextProps.design

  render: ->
    saveCallback = -> @props.saveCallback.apply @, arguments

    console.log @props.design
    return `<div className="settings-design__controls">
              <DesignSettingsPopup_ControlsBackgroundItem />

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

#   save: (key, value) ->
#     @createRequest
#       url: Routes.api.design_settings_url(@scope.tlog_data.slug)
#       data:
#       success: (calendar) =>
#         @safeUpdateState calendar: calendar
#       error: (data) =>
#         TastyNotifyController.errorResponse data


#     options=
#       method: 'PUT'
#       data:   @scope.formData
#       withCredentials: true
#       url:    Routes.api.design_settings_url(@scope.tlog_data.slug)

#     DesignSettingsService.showLoader()

#     $http(options).
#       success( -> TastyNotifyController.notify 'success', 'Настройки сохранены', 2000 ).
#       error( (data, status) -> TastyNotifyController.errorResponse data ).
#       finally( -> DesignSettingsService.hideLoader() )

#   debounceUpdate:  (newVal, oldVal) =>
#     if newVal != oldVal
#       $timeout.cancel @timeout if @timeout
#       @timeout = $timeout(@saveChanges, secondsToWaitBeforeSave * 1000 )

# ]