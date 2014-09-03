###* @jsx React.DOM ###

window.PostActions_PrivacyButton = React.createClass

  propTypes:
    private:  React.PropTypes.bool
    onChange: React.PropTypes.func.isRequired

  render: ->
    iconClasses = React.addons.classSet {
      'icon': true
      'icon--unlock': !@props.private
      'icon--lock': @props.private
    }

    return `<button className="button button--outline-grey post-settings-button"
                    onClick={ this.onClick }>
              <span className={ iconClasses } />
            </button>`

  onClick: -> @props.onChange !@props.private