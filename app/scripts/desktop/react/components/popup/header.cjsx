classnames = require 'classnames'

window.PopupHeader = React.createClass

  propTypes:
    title:         React.PropTypes.string.isRequired
    onClickClose:  React.PropTypes.func.isRequired
    hasActivities: React.PropTypes.bool
    isDraggable:   React.PropTypes.bool

  getDefaultProps: ->
    hasActivities: false
    isDraggable: false

  render: ->
    headBoxClasses = classnames('popup__headbox', {
      'cursor--move': @props.isDraggable
    })

    return <div className="popup__header">
             <div className={ headBoxClasses }>
               <h3 className="popup__title">{ this.props.title }</h3>
             </div>
             <PopupSpinner hasActivities={ this.props.hasActivities } />
             <div className="popup__close" onClick={ this.props.onClickClose }>
               <div className="icon icon--cross"></div>
             </div>
           </div>