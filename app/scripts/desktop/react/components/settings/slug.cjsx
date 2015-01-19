{ PropTypes } = React

EMPTY_SLUG_MESSAGE = 'Название тлога не может быть пустым'

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
          placeholder="Введите ваш псевдоним"
          onEditEnd={ @handleEditEnd } />
    </div>

  handleEditEnd: (slug) ->
    if slug && slug isnt @state.slug
      @setState(slug: slug)
      @props.onChange slug
    else
      TastyNotifyController.notifyError EMPTY_SLUG_MESSAGE, 2000
      @forceUpdate()

module.exports = SettingsSlug