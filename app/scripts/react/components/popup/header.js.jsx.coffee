###* @jsx React.DOM ###

window.PopupHeader = PopupHeader = React.createClass

  propTypes:
    title:        React.PropTypes.string.isRequired
    onClickClose: React.PropTypes.func.isRequired
    activities:   React.PropTypes.number
    isDraggable:  React.PropTypes.bool

  getDefaultProps: ->
    activities: 0

  render: ->
    headBoxClasses = React.addons.classSet {
      'popup__headbox': true
      'js-popup-headbox': @props.isDraggable
      'cursor--move': @props.isDraggable
    }

    return `<div className="popup__header">
              <div className={ headBoxClasses } ref="tester">
                <h3 className="popup__title">{ this.props.title }</h3>
              </div>
              <PopupSpinner activities={ this.props.activities } />
              <div className="popup__close" onClick={ this.props.onClickClose }>
                <div className="icon icon--cross"></div>
              </div>
            </div>`

module.exports = PopupHeader