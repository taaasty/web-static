###* @jsx React.DOM ###

module.experts = window.SettingsTitle = React.createClass
  propTypes:
    user:     React.PropTypes.object.isRequired

  getInitialState: ->
    isEditing: false
    title:     @props.user.title


  render: ->
    if @state.title?
      title = `<span className="editable-field__value">{this.props.user.title}</span>`
    else
      title = `<span className="editable-field__placeholder">Введите небольшое описание вашего тлога</span>`


    `<div className="hero-simple__text">
      <div className="editable-field">
        <div className="editable-field__control-wrap">
          <textarea className="editable-field__control" maxLength="140" defaultValue={this.state.title}></textarea>
        </div>
        <div className="editable-field__content">
          {title}
          <span className="editable-field__button"><i className="icon icon--pencil"></i></span>
        </div>
      </div>
    </div>`

