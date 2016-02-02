classnames = require 'classnames'
{ PropTypes } = React

EditorPrivacyButton = React.createClass
  displayName: 'EditorPrivacyButton'

  propTypes:
    live: PropTypes.bool.isRequired
    private: PropTypes.bool.isRequired
    onClick: PropTypes.func.isRequired

  componentDidMount: ->
    this.$button = $( @getDOMNode() )
    this.setTooltip()

  componentDidUpdate: ->
    this.$button?.tooltip('destroy')
    this.setTooltip()

  componentWillUnmount: ->
    this.$button?.tooltip('destroy');

  setTooltip: ->
    this.$button?.tooltip({ placement: 'bottom', title: this.getTitle() });

  render: ->
    iconClasses = classnames('icon', {
      'icon--unlock': !@props.private
      'icon--lock': @props.private
    })

    return <button title={ @getTitle() }
                   className="button button--outline-grey post-settings-button"
                   onClick={ @handleClick }>
             <span className={ iconClasses } />
           </button>

  getTitle: ->
    title = if @props.private then i18n.t 'editor_private_entry' else i18n.t 'editor_public_entry'
    title = i18n.t 'editor_public_with_voting_entry' if @props.live
    title

  handleClick: ->
    @$button?.tooltip 'hide'
    @props.onClick()

module.exports = EditorPrivacyButton
