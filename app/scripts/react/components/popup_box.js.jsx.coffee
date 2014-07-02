###* @jsx React.DOM ###

module.experts = window.PopupBox = React.createClass
  propTypes:
    title: React.PropTypes.string.isRequired

  close: -> ReactApp.closePopup()

  componentWillMount: ->
    Mousetrap.bind 'esc', @close

  componentWillUnmount: ->
    Mousetrap.unbind 'esc', @close

  render: ->
    # TODO Устнанавливать title из children-а
    `<div className='popup-container'>
      <div className='popup-container__main'>
        <div className='popup-container__cell'>
          <div className="popup popup--settings popup--dark">
             <div className="popup__header">
                <div className="popup__headbox js-popup-headbox"><h3 className="popup__title">{this.props.title}</h3></div>
                {this.loader()}
                <div className="popup__close" onClick={this.close}><div className="icon icon--cross"></div></div>
             </div>
             <div className="popup__body">{this.props.children}</div>
          </div>
        </div>
      </div>
    </div>`

  loader: ->
    `<div className="popup__loader state--hidden js-popup-loader"><span className="spinner spinner--8x8"><span className="spinner__icon"></span></span></div>`

