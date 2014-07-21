###* @jsx React.DOM ###

KEYCODE_ESC = 27
KEYCODE_ENTER = 13

module.experts = window.SettingsTitle = React.createClass
  propTypes:
    title:        React.PropTypes.string.isRequired
    saveCallback: React.PropTypes.func.isRequired

  getInitialState: ->
    isEditing: false

  startEdit: (event) ->
    @setState isEditing: true

  save: ->
    @props.saveCallback 'title', @refs.title.state.value
    @setState isEditing: false

  handleBlur: (event)->
    @cancel()

  cancel: ->
    @setState isEditing: false

  handleKey: (event) ->
    if event.keyCode == KEYCODE_ESC
      event.preventDefault()
      @cancel()
    if event.keyCode == KEYCODE_ENTER
      event.preventDefault()
      @save()

  render: ->
    if @state.isEditing
      inner = @edit()
    else
      inner = @show()

    `<div className="hero-simple__text"><div className="editable-field">{inner}</div></div>`

  hasTitle: ->
    @props.title? && @props.title.length>0

  edit: ->
    `<div className="editable-field__control-wrap"><textarea autoFocus={true} onBlur={this.handleBlur} onKeyDown={this.handleKey} ref='title' className="editable-field__control" maxLength="140" defaultValue={this.props.title}></textarea></div>`

  show: ->
    if @hasTitle()
      title = `<span className="editable-field__value">{this.props.title}</span>`
    else
      title = `<span className="editable-field__placeholder">Введите небольшое описание вашего тлога</span>`

    `<div onClick={this.startEdit} className="editable-field__content">
      {title}
      <span className="editable-field__button"><i className="icon icon--pencil"></i></span>
    </div>`



