SettingsSlug = React.createClass

  propTypes:
    slug:     React.PropTypes.string.isRequired
    onChange: React.PropTypes.func.isRequired

  getInitialState: ->
    slug: @props.slug

  render: ->
    <div className="settings__hero__name">
      <EditableField
          defaultValue={ this.state.slug }
          placeholder="Введите ваш псевдоним"
          onEditEnd={ this.handleEditEnd } />
    </div>

  handleEditEnd: (slug) ->
    if slug && slug isnt @props.slug
      @setState(slug: slug)
      @props.onChange slug

module.exports = SettingsSlug