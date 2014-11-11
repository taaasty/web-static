###* @jsx React.DOM ###

window.PostActions_VoteButton = React.createClass

  propTypes:
    enabled:  React.PropTypes.bool
    onChange: React.PropTypes.func.isRequired

  componentDidMount: ->
    @$button = $( @getDOMNode() )

    @$button.tooltip placement: 'bottom'

  componentWillUnmount: ->
    @$button.tooltip 'destroy'

  render: ->
    iconClasses = React.addons.classSet {
      'icon': true
      'post-settings-voting': true
      'post-settings-voted': @props.enabled
    }

    return `<button className="button button--outline-grey post-settings-button"
                    data-original-title={ this._getTooltipTitle() }
                    onClick={ this.onClick }>
              <span className={ iconClasses } />
            </button>`

  _getTooltipTitle: ->
    if @props.enabled then 'Убрать голосование' else 'Добавить голосование'

  onClick: ->
    @props.onChange !@props.enabled
    @$button.tooltip 'hide'