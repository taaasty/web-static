{ PropTypes } = React

Messenger = React.createClass
  displayName: 'Messenger'

  propTypes:
    conversations: PropTypes.array.isRequired

  render: ->
    <div className="messages">
      <div className="messages__section messages__section--dialogs">
        <div className="messages__header">
          <h3 className="messages__title">Диалоги</h3>
        </div>
        <div className="messages__body">
          <div className="messages__dialogs">
            <div className="messages__dialog">
              <div className="messages__user-avatar">
                <span className="avatar">
                  <span className="avatar__text">L</span>
                </span>
              </div>
              <div className="messages__dialog-text">
                <span className="messages__user-name">Liver</span> Привет
              </div>
              <span className="messages__date">28 ноября 14:27</span>
            </div>
            <div className="messages__dialog __read">
              <div className="messages__user-avatar">
                <span className="avatar">
                  <span className="avatar__text">B</span>
                </span>
              </div>
              <div className="messages__dialog-text">
                <span className="messages__user-name">boom</span> Все в силе?
              </div>
              <span className="messages__date">3 октября 16:53</span>
            </div>
          </div>
        </div>
        <div className="messages__footer">
          <button className="messages__button">Cоздать переписку</button>
        </div>
      </div>
    </div>

module.exports = Messenger