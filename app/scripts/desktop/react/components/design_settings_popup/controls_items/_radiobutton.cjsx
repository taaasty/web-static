window.DesignSettingsPopup_ControlsRadioButton = React.createClass

  propTypes:
    settingId: React.PropTypes.string.isRequired
    value:     React.PropTypes.string.isRequired
    text:      React.PropTypes.string.isRequired
    className: React.PropTypes.string
    isActive:  React.PropTypes.bool
    className: React.PropTypes.string
    onChange:  React.PropTypes.func.isRequired

  render: ->
    labelClasses = React.addons.classSet {
      'form-radio':         true
      'form-radio--active': @props.isActive
    }

    labelClasses += @_getSpecificButtonClass()

    return <label htmlFor={ this._getButtonId() }
                  className={ labelClasses }>
             <span className="form-radio__inner">
               <span className="form-radio__text">{ this.props.text }</span>
               <input type="radio"
                      name={ this.props.settingId }
                      value={ this.props.value }
                      id={ this._getButtonId() }
                      onChange={ this.onChange }
                      className="form-radio__input" />
             </span>
           </label>

  _getSettingPrefix: ->
    settingId = @props.settingId.toLowerCase()

    "tlog-" + settingId + "-"

  _getButtonId: ->
    @_getSettingPrefix() + @props.value

  _getSpecificButtonClass: ->
    if @props.className
      ' form-radio--' + @props.className
    else
      ' form-radio--' + @props.value  

  _setBodyClass: ->
    settingPrefix = @_getSettingPrefix()

    classes = document.body.className.split(' ').filter (c) ->
      c.lastIndexOf(settingPrefix, 0) != 0

    classes.push @_getButtonId()

    document.body.className = $.trim( classes.join(' ') )

  onChange: ->
    @props.onChange @props.value
    @_setBodyClass()