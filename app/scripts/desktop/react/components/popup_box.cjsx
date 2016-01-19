LinkedStateMixin = require 'react-addons-linked-state-mixin';

window.PopupBox = React.createClass
  mixins: [ReactUnmountMixin, LinkedStateMixin, 'ReactActivitiesMixin']

  propTypes:
    title: React.PropTypes.string.isRequired

  componentWillMount:   -> Mousetrap.bind 'esc', @unmount
  componentWillUnmount: -> Mousetrap.unbind 'esc', @unmount

  render: ->
    newChildren = React.Children.map @props.children, (context) =>
      React.cloneElement(context, { activitiesHandler: this.activitiesHandler })

    # TODO Устнанавливать title из children-а
    <div className='popup-container'>
      <div className='popup-container__main'>
        <div className='popup-container__cell' onClick={this.handleClick}>
          <div className="popup popup--settings popup--dark">
            <PopupHeader title={ this.props.title }
                         hasActivities={ this.hasActivities() }
                         onClickClose={ this.close } />
             <div className="popup__body">{ newChildren }</div>
          </div>
        </div>
      </div>
    </div>

  handleClick: (e) ->
    if $(e.target).hasClass('popup-container__cell')
      e.preventDefault()
      @close()

  close: ->
    if @props.onClose? then @props.onClose() else @unmount()