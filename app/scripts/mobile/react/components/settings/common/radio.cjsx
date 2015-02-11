UuidService = require '../../../../../shared/react/services/uuid'
{ PropTypes } = React

Settings_Radio = React.createClass
  displayName: 'Settings_Radio'

  propTypes:
    title:       PropTypes.string.isRequired
    description: PropTypes.string.isRequired
    checked:     PropTypes.bool.isRequired
    onChange:    PropTypes.func.isRequired

  componentWillMount: ->
    @id = UuidService.generate()

  render: ->
    <div className="settings__item">
      <div className="settings__right">
        <div className="switcher">
          <input type="checkbox"
                 id={ @id }
                 className="switcher__input"
                 onChange={ @handleChange } />
          <label htmlFor={ @id }
                 className="switcher__label">
            <span className="switcher__btn switcher__btn--on">Да</span>
            <span className="switcher__btn switcher__btn--off">Нет</span>
          </label>
        </div>
      </div>
      <div className="settings__left">
        <h3 className="settings__title">{ @props.title }</h3>
        <p className="settings__desc">{ @props.description }</p>
      </div>
    </div>

  handleChange: (e) ->
    checked = e.target.checked
    @props.onChange checked

module.exports = Settings_Radio