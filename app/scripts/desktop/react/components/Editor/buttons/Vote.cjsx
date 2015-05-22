classnames = require 'classnames'
{ PropTypes } = React

EditorVoteButton = React.createClass
  displayName: 'EditorVoteButton'

  propTypes:
    enabled: PropTypes.bool.isRequired
    onClick: PropTypes.func.isRequired

  componentDidMount: ->
    $button = $( @getDOMNode() )
    $button.tooltip placement: 'bottom'

  componentDidUpdate: (prevProps) ->
    if prevProps.enabled != @props.enabled
      $button = $( @getDOMNode() )
      $button
        .tooltip('hide')
        .tooltip('show')

  componentWillUnmount: ->
    $button = $( @getDOMNode() )
    $button.tooltip 'destroy'

  render: ->
    iconClasses = classnames('icon', 'post-settings-voting', {
      'post-settings-voted': @props.enabled
    })

    return <button data-original-title={ @getTitle() }
                   className="button button--outline-grey post-settings-button"
                   onClick={ @handleClick }>
             <span className={ iconClasses } />
           </button>

  getTitle: ->
    if @props.enabled then i18n.t 'editor_disable_voting' else i18n.t 'editor_enable_voting'

  handleClick: ->
    @props.onClick()

module.exports = EditorVoteButton