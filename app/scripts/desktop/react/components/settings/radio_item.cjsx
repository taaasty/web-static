SettingsRadioItem = React.createClass

  propTypes:
    title:       React.PropTypes.string.isRequired
    description: React.PropTypes.string.isRequired
    checked:     React.PropTypes.bool
    key:         React.PropTypes.string.isRequired
    onChange:    React.PropTypes.func.isRequired

  getDefaultProps: ->
    checked: false

  render: ->
    <div className="settings__item">
      <div className="settings__right">
        <div className="switcher">
          <input type="checkbox"
                 checked={ this.props.checked }
                 id={ this.props.key }
                 className="switcher__input"
                 onChange={ this.handleChange } />
          <label htmlFor={ this.props.key }
                 className="switcher__label">
            <span className="switcher__btn switcher__btn--on">Да</span>
            <span className="switcher__btn switcher__btn--off">Нет</span>
          </label>
        </div>
      </div>
      <div className="settings__left">
        <h3 className="settings__title">{ this.props.title }</h3>
        <p className="settings__desc">{ this.props.description }</p>
      </div>
    </div>

  handleChange: (e) ->
    @props.onChange e.target.checked

module.exports = SettingsRadioItem