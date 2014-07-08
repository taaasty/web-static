###* @jsx React.DOM ###

module.experts = window.SettingsRadioItem = React.createClass
  propTypes:
    user:         React.PropTypes.instanceOf(Backbone.Model).isRequired
    saveCallback: React.PropTypes.func.isRequired

    key:          React.PropTypes.string.isRequired
    title:        React.PropTypes.string.isRequired
    description:  React.PropTypes.string.isRequired

  handleChange: (e)-> @props.saveCallback @props.key, e.target.checked

  render: ->
    checked = @props.user.get @props.key
    `<div className="settings__item">
      <div className="settings__right">
        <div className="switcher">
          <input id={this.props.key} className="switcher__input" type="checkbox" defaultChecked={checked} onChange={this.handleChange}/>
          <label className="switcher__label" htmlFor={this.props.key}>
            <span className="switcher__btn switcher__btn--on">Да</span>
            <span className="switcher__btn switcher__btn--off">Нет</span>
          </label>
        </div>
      </div>
      <div className="settings__left">
        <h3 className="settings__title">{this.props.title}</h3>
        <p className="settings__desc">{this.props.description}</p>
      </div>
    </div>`

