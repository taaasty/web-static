{ PropTypes } = React

DesignSettingsOptionState = React.createClass
  displayName: 'DesignSettingsOptionState'

  propTypes:
    style: PropTypes.string.isRequired
    text:  PropTypes.string

  render: ->
    <span className={ 'design-settings__state design-settings__state--' + @props.style + ' ds-absolute-right ds-fadeout-right' }>
      <span className="design-settings__state-i">
        { @props.text }
      </span>
    </span>

module.exports = DesignSettingsOptionState