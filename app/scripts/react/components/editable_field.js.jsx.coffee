###* @jsx React.DOM ###

window.EditableField = React.createClass
  mixins: [RequesterMixin]

  propTypes:
    maxLength: React.PropTypes.number
    defaultValue: React.PropTypes.string
    placeholder: React.PropTypes.string

  getInitialState: ->
    empty: @props.defaultValue.trim() == ""
    focus: false

  componentDidMount: ->
    $textarea = $(@refs.textarea.getDOMNode())

    # require jquery.autosize.min.js
    if $.fn.autosize
      $textarea.autosize()

    # require jquery.maxlength.js
    $textarea.maxlength({
      max: $textarea.attr("maxlength") || 140,
      showFeedback: false
    });

  render: ->
    editableFieldClasses = React.addons.classSet {
      "editable-field": true
      "state--empty": @isEmpty()
      "state--focus": @isFocus()
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
                <span className="editable-field__placeholder" ref="placeholder">{ this.props.placeholder }</span>
                <span className="editable-field__value" ref="value">{ this.props.defaultValue }</span>
                <span className="editable-field__button"
                      onClick={ this.onFocus }>
                  <i className="icon icon--pencil"></i>
                </span>
              </div>
            </div>`

  onFocus: ->
    that = @

    @setState focus: true

    _.defer ->
      value = that.refs.textarea.getDOMNode().value
      $(that.refs.textarea.getDOMNode()).val("").focus().val value
      return

  onBlur: ->
    @setState focus: false

  onChange: (e) ->
    that = @

    if e.which == 13
      $(e.target).trigger "blur";
      return false;

    _.defer ->
      textarea = that.refs.textarea.getDOMNode()
      value = that.refs.value.getDOMNode()

      textarea.value = textarea.value.replace /\n/g, ""
      $(value).text(textarea.value)
      $(textarea).trigger "autosize.resize"

      that.setState empty: (if (textarea.value.trim() is "") then true else false)

      return

  isEmpty: ->
    @state.empty

  isFocus: ->
    @state.focus

module.exports = window.EditableField