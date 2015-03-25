_ = require 'lodash'
{ PropTypes } = React

#TODO: Maybe will be better if we will get this data from EditorStore?
FIELD_MODES = ['inline', 'partial', 'rich']
FIELD_MODE_OPTIONS =
  inline:
    disableToolbar: true
    disableReturn: true
    disableDoubleReturn: true
    cleanPastedHTML: true

  partial:
    disableToolbar: true
    disableReturn: false
    disableDoubleReturn: true
    cleanPastedHTML: true

  rich:
    buttons: ['anchor', 'italic', 'quote', 'orderedlist', 'unorderedlist']
    disableToolbar: false
    disableReturn: false
    disableDoubleReturn: false
    cleanPastedHTML: true
    targetBlank: true

EditorTextField = React.createClass
  displayName: 'EditorTextField'

  propTypes:
    mode: PropTypes.string
    text: PropTypes.string
    placeholder: PropTypes.string.isRequired
    className: PropTypes.string
    autoFocus: PropTypes.bool
    onChange: PropTypes.func.isRequired

  getDefaultProps: ->
    mode: 'inline'

  shouldComponentUpdate: ->
    # Не обновляем поле, данные берём только при рендере с пропсов.
    # Medium-editor сбрасывает каретку на начало строки при обновлении компонента
    false

  componentDidMount: ->
    fieldContent = @refs.fieldContent.getDOMNode()
    options = _.extend {}, FIELD_MODE_OPTIONS[@props.mode],
      placeholder: @props.placeholder.replace '<br>', '\r\n'

    @mediumEditor = new MediumEditor fieldContent, options
    # @placeCaretAtEnd fieldContent if @props.autoFocus

  # componentDidUpdate: ->
  #   if @props.isLoading then @mediumEditor.deactivate?() else @mediumEditor.activate?()

  #   @_managePlaceholder()

  componentWillUnmount: ->
    @mediumEditor.deactivate()
    @mediumEditor = null

  render: ->
    <div className={ "tasty-editor " + @props.className }>
      <div ref="fieldContent"
           className="tasty-editor-content"
           onInput={ @handleInput }
           dangerouslySetInnerHTML={{ __html: @props.text }} />
    </div>

  # placeCaretAtEnd: (el) ->
  #   el.focus()
  #   if typeof window.getSelection? && document.createRange?
  #     range = document.createRange()
  #     el.innerHTML = '&#8203'
  #     range.selectNodeContents(el)
  #     range.collapse(false)
  #     sel = window.getSelection()
  #     sel.removeAllRanges()
  #     sel.addRange(range)
  #   else if typeof document.body.createTextRange?
  #     textRange = document.body.createTextRange()
  #     textRange.moveToElementText(el)
  #     textRange.collapse(false)
  #     textRange.select()

  handleInput: (e) ->
    value = e.target.innerHTML
    @props.onChange value

module.exports = EditorTextField