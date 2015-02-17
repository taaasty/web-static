#FIXME: Нужно уменьшить вложенность элементов для вывода текстов сообщений по центру

MessageListEmpty = React.createClass
  displayName: 'MessageListEmpty'

  render: ->
    <div className="messages__scroll">
      <div className="messages__list">
        <div className="messages__list-cell">
          <div className="messages__empty">
            <div className="messages__empty-text">
              Здесь будут отображаться сообщения
            </div>
          </div>
        </div>
      </div>
    </div>

module.exports = MessageListEmpty