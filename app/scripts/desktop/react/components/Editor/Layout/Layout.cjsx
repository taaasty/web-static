{ PropTypes } = React

EditorLayout = React.createClass
  displayName: 'EditorLayout'

  propTypes:
    backUrl: PropTypes.string
    loading: PropTypes.bool.isRequired
    children: PropTypes.oneOfType([
      PropTypes.element, PropTypes.array
    ]).isRequired

  render: ->
    <div>
      { @renderBackButton() }
      { @props.children }
    </div>

  renderBackButton: ->
    unless @props.loading
      <a className="back-button"
         onClick={ @handleClick } />

  handleClick: ->
    if @props.backUrl
      window.location.href = @props.backUrl
    else
      window.history.back()

module.exports = EditorLayout