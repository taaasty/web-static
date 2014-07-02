###* @jsx React.DOM ###
#= require ./popup_spinner

module.exports = window.PopupBox = React.createClass
  mixins: [React.addons.LinkedStateMixin]
  propTypes:
    title: React.PropTypes.string.isRequired

  getInitialState: ->
    title: '---'
    spinnerActivities: 0

  close: -> ReactApp.closePopup()

  componentWillMount: ->
    Mousetrap.bind 'esc', @close

  componentWillUnmount: ->
    Mousetrap.unbind 'esc', @close

  render: ->
    showSpinner = true

    linkState = @linkState 'spinnerActivities'
    React.Children.map @props.children, (context)->
      context.props.spinnerLink = linkState

    # TODO Устнанавливать title из children-а
    `<div className='popup-container'>
      <div className='popup-container__main'>
        <div className='popup-container__cell'>
          <div className="popup popup--settings popup--dark">
             <div className="popup__header">
                <div className="popup__headbox"><h3 className="popup__title">{this.props.title}</h3></div>
                  <PopupSpinner activities={this.state.spinnerActivities} />
                <div className="popup__close" onClick={this.close}><div className="icon icon--cross"></div></div>
             </div>
             <div className="popup__body">{this.props.children}</div>
          </div>
        </div>
      </div>
    </div>`
