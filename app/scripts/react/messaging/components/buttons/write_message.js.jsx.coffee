###* @jsx React.DOM ###

#TODO: i18n
TITLE = 'Написать сообщение'

window.WriteMessageButton = React.createClass

  propTypes:
    user: React.PropTypes.object.isRequired

  render: ->
    title = @_getTitle()

    return `<button className="write-message-button"
                    onClick={ this.handleClick }>
              { title }
            </button>`

  _getTitle: -> TITLE

  handleClick: ->
    console.log 'Открываем im с пользователем', @props.user.slug