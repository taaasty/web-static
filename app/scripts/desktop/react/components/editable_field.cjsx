cx               = require 'react/lib/cx'
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
    @$textarea = $( @refs.textarea.getDOMNode() )

    # require jquery.autosize.min.js
    if $.fn.autosize
      @$textarea.autosize(append: '') # По-умолчанию в конец строки добавляет \n. Отключаем, чтобы при инициализации правильно высчитывалась высота

  render: ->
    editableFieldClasses = cx
      'editable-field': true
      'state--empty':   @isEmpty()
      'state--focus':   @state.isFocus

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

      @$textarea.val('').focus().val textareaValue

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
      @$textarea.trigger 'autosize.resize'

  isEmpty: ->
    # При сохранении данных в настройках, обновляется моделька user,
    # если isEmpty будем стейтом, то не смотря на то, что defaultValue обновится
    # стейт останется изначальным. Выделяем проверку в метод.
    @props.defaultValue.trim() == ''

  getValue: ->
    textarea = @refs.textarea.getDOMNode()
    textarea.value.replace /\n/g, ''