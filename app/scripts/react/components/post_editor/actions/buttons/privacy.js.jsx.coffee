###* @jsx React.DOM ###

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
    iconClasses = React.addons.classSet {
      'icon': true
      'icon--unlock': !@props.private
      'icon--lock': @props.private
    }

    return `<button className="button button--outline-grey post-settings-button"
                    data-original-title={ this._getTooltipTitle() }
                    onClick={ this.onClick }>
              <span className={ iconClasses } />
            </button>`

  _getTooltipTitle: ->
    title = if @props.private then 'Закрытая запись' else 'Открытая запись'
    title = 'Открытая запись с голосованием' if @props.isVoteEnabled

    title

  onClick: ->
    @props.onChange !@props.private
    @$button.tooltip 'hide'