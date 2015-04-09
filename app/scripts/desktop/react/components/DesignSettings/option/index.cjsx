{ PropTypes } = React

DesignSettingsOption = React.createClass
  displayName: 'DesignSettingsOption'

  propTypes:
    children: PropTypes.oneOfType([
      PropTypes.element
      PropTypes.array
    ]).isRequired
    title: PropTypes.string.isRequired
    name: PropTypes.string.isRequired
    free: PropTypes.bool

  render: ->
    <div className={ "design-settings__option design-settings__option--" + @props.name }>
      <div className="design-settings__option-content">
        <span className="design-settings__text ds-absolute-left ds-fadeout-down">
          { @props.title }{ @renderFreeLabel() }
        </span>
        { @props.children }
      </div>
    </div>

  renderFreeLabel: ->
    <span className="free">free</span> if @props.free

module.exports = DesignSettingsOption