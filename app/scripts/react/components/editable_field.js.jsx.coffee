###* @jsx React.DOM ###

window.EditableField = React.createClass
  mixins: [RequesterMixin]

  propTypes:
    maxLength: React.PropTypes.number
    defaultValue: React.PropTypes.string
    placeholder: React.PropTypes.string.isRequired

  getDefaultProps: ->
    maxLength: 140

  getInitialState: ->
    isEmpty: @props.defaultValue.trim() == ""
    isFocus: false

  componentDidMount: ->
    $textarea = $(@refs.textarea.getDOMNode())

    # require jquery.autosize.min.js
    if $.fn.autosize
      $textarea.autosize()

    # require jquery.maxlength.js
    if $.fn.maxlength
      $textarea.maxlength({
        max: $textarea.attr("maxlength"),
        showFeedback: false
      });

  render: ->
    editableFieldClasses = React.addons.classSet {
      "editable-field": true
      "state--empty": @state.isEmpty
      "state--focus": @state.isFocus
    }

    return `<div className={ editableFieldClasses }>
              <div className="editable-field__control-wrap">
                <textarea className="editable-field__control"
                          onBlur = { this.onBlur }
                          onKeydown = { this.onChange }
                          onInput = { this.onChange }
                          onPaste = { this.onChange }
                          maxLength={ this.props.maxLength }
                          defaultValue={ this.props.defaultValue }
                          ref="textarea"></textarea>
              </div>
              <div className="editable-field__content">
                <span className="editable-field__placeholder">{ this.props.placeholder }</span>
                <span className="editable-field__value" ref="value">{ this.props.defaultValue }</span>
                <span className="editable-field__button"
                      onClick={ this.onFocus }>
                  <i className="icon icon--pencil"></i>
                </span>
              </div>
            </div>`

  onFocus: ->
    @setState isFocus: true

    _.defer =>
      value = @refs.textarea.getDOMNode().value
      $(@refs.textarea.getDOMNode()).val("").focus().val value
      return

  onBlur: ->
    @setState isFocus: false

  onChange: (e) ->
    # По нажатию на enter выходим из редактирования (либо организуем сохранение на сервер)
    if e.which == 13
      $(e.target).trigger "blur";
      return false;

    _.defer =>
      textarea = @refs.textarea.getDOMNode()
      value = @refs.value.getDOMNode()

      textarea.value = textarea.value.replace /\n/g, ""
      $(value).text(textarea.value)
      $(textarea).trigger "autosize.resize"

      @setState isEmpty: textarea.value.trim() is ""
      return