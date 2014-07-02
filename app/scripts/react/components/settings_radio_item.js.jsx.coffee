###* @jsx React.DOM ###

module.experts = window.SettingsRadioItem = React.createClass
  propTypes:
    key:   React.PropTypes.string.isRequired
    title: React.PropTypes.string.isRequired
    user:  React.PropTypes.object.isRequired
    description:  React.PropTypes.string.isRequired
    saveCallback: React.PropTypes.func.isRequired

  getInitialState: ->
    checked: @props.user[@props.key]

  handleChange: (e)->
    @props.saveCallback @props.key, e.target.checked

  render: ->
    `<div className="settings__item">
      <div className="settings__right">
        <div className="switcher">
          <input id={this.props.key} className="switcher__input" type="checkbox" defaultChecked={this.state.checked} onChange={this.handleChange}/>
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

