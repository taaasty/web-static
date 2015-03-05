{ PropTypes } = React

DesignSettingsGroup = React.createClass
  displayName: 'DesignSettingsGroup'

  propTypes:
    children: PropTypes.oneOfType([
      PropTypes.element
      PropTypes.array
    ]).isRequired
    title: PropTypes.string.isRequired

  render: ->
    <section className="design-settings__group">
      <header className="design-settings__group-header">
        { @props.title }
      </header>
      <div className="design-settings__group-content">
        { @props.children }
      </div>
    </section>

module.exports = DesignSettingsGroup