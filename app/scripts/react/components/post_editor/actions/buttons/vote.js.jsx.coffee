###* @jsx React.DOM ###

window.PostActions_VoteButton = React.createClass

  propTypes:
    enabled:  React.PropTypes.bool
    onChange: React.PropTypes.func.isRequired

  render: ->
    iconClasses = React.addons.classSet {
      'icon': true
      'post-settings-voting': true
      'post-settings-voted': @props.enabled
      # 'icon--fire': !@props.enabled
      # 'icon--fire-fill': @props.enabled
    }

    return `<button className="button button--outline-grey post-settings-button"
                    onClick={ this.onClick }>
              <span className={ iconClasses } />
            </button>`

  onClick: -> @props.onChange !@props.enabled