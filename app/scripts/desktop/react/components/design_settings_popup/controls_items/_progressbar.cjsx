window.DesignSettingsPopup_ControlsProgressbar = React.createClass

  propTypes:
    progress: React.PropTypes.number.isRequired

  shouldComponentUpdate: (nextProps) ->
    @props.progress != nextProps.progress

  render: ->
    progressBarStyles =
      width: @_getWidth()
      opacity: if (100 > @props.progress > 0) then 1 else 0

    return <div style={ progressBarStyles }
                className="settings-design--progressbar" />

  _getWidth: -> @props.progress + '%'