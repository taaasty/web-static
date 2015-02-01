cx = require 'react/lib/cx'

window.PostActions_PrivacyButton = React.createClass

  propTypes:
    private:       React.PropTypes.bool
    isVoteEnabled: React.PropTypes.bool
    onChange:      React.PropTypes.func.isRequired

  componentDidMount: ->
    @$button = $( @getDOMNode() )

    @$button.tooltip placement: 'bottom'

  componentWillUnmount: ->
    @$button.tooltip 'destroy'

  render: ->
    iconClasses = cx
      'icon': true
      'icon--unlock': !@props.private
      'icon--lock': @props.private

    return <button className="button button--outline-grey post-settings-button"
                   data-original-title={ this._getTooltipTitle() }
                   onClick={ this.onClick }>
             <span className={ iconClasses } />
           </button>

  _getTooltipTitle: ->
    title = if @props.private then i18n.t 'editor_private_entry' else i18n.t 'editor_public_entry'
    title = i18n.t 'editor_public_with_voting_entry' if @props.isVoteEnabled

    title

  onClick: ->
    @props.onChange !@props.private
    @$button.tooltip 'hide'