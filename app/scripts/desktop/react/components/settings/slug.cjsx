{ PropTypes } = React

SettingsSlug = React.createClass
  displayName: 'SettingsSlug'

  propTypes:
    slug:     PropTypes.string.isRequired
    onChange: PropTypes.func.isRequired

  getInitialState: ->
    slug: @props.slug

  render: ->
    <div className="settings__hero__name">
      <EditableField
          defaultValue={ @state.slug }
          placeholder={ i18n.t('settings_slug_placeholder') }
          onEditEnd={ @handleEditEnd } />
    </div>

  handleEditEnd: (slug) ->
    if slug && slug isnt @state.slug
      @setState(slug: slug)
      @props.onChange slug
    else
      NoticeService.notifyError i18n.t('settings_empty_slug_error'), 2000
      @forceUpdate()

module.exports = SettingsSlug