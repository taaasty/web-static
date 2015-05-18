autosize = require 'autosize'
classnames = require 'classnames'
LinkedStateMixin = require 'react/lib/LinkedStateMixin'

KEYCODE_ENTER = 13

window.EditableField = React.createClass
  mixins: [LinkedStateMixin]

  propTypes:
    maxLength:    React.PropTypes.number
    defaultValue: React.PropTypes.string
    placeholder:  React.PropTypes.string.isRequired
    onEditEnd:    React.PropTypes.func.isRequired

  getDefaultProps: ->
    maxLength: 140

  getInitialState: ->
    value: @props.defaultValue
    isFocus: false

  componentWillReceiveProps: (nextProps) ->
    @setState(value: nextProps.defaultValue)

  componentDidMount: ->
    field = @refs.textarea.getDOMNode()
    autosize(field, {append: ''})

  render: ->
    editableFieldClasses = classnames('editable-field', {
      'state--empty': @isEmpty()
      'state--focus': @state.isFocus
    })

    return <div className={ editableFieldClasses }>
             <div className="editable-field__control-wrap">
               <textarea ref="textarea"
                         maxLength={ this.props.maxLength }
                         valueLink={ @linkState('value') }
                         className="editable-field__control"
                         onBlur={ this.onBlur }
                         onKeyDown={ this.onChange }
                         onPaste={ this.onChange } />
             </div>
             <div className="editable-field__content">
               <span className="editable-field__placeholder">{ this.props.placeholder }</span>
               <span ref="value"
                     className="editable-field__value">
                 { @state.value }
               </span>
               <span className="editable-field__button"
                     onClick={ this.onFocus }>
                 <i className="icon icon--pencil" />
               </span>
             </div>
           </div>

  onFocus: ->
    @setState isFocus: true

    _.defer =>
      textareaValue = @getValue()

      field = @refs.textarea.getDOMNode()
      field.value = ''
      field.focus()
      field.value = textareaValue

  onBlur: ->
    @props.onEditEnd @getValue()
    @setState isFocus: false

  onChange: (e) ->
    # По нажатию на enter выходим из редактирования (либо организуем сохранение на сервер)
    if e.which == KEYCODE_ENTER
      $(e.target).trigger 'blur'
      e.preventDefault()

    _.defer =>
      value = @refs.value.getDOMNode()

      $(value).text @getValue()

      field = @refs.textarea.getDOMNode()
      evt = document.createEvent('Event')
      evt.initEvent('autosize:update', true, false)
      field.dispatchEvent(evt)

  isEmpty: ->
    # При сохранении данных в настройках, обновляется моделька user,
    # если isEmpty будем стейтом, то не смотря на то, что defaultValue обновится
    # стейт останется изначальным. Выделяем проверку в метод.
    @props.defaultValue.trim() == ''

  getValue: ->
    textarea = @refs.textarea.getDOMNode()
    textareaValue = textarea.value.replace /\n/g, ''
    textareaValue.trim()