###* @jsx React.DOM ###

window.MessagesPopup_Thread = React.createClass

  propTypes:
    conversationId: React.PropTypes.number.isRequired
  
  getInitialState: ->
    isEmpty: false

  render: ->
    if @state.isEmpty
      thread = `<MessagesPopup_ThreadEmpty />`
    else
      thread = `<MessagesPopup_ThreadList />`

    return `<div data-section="thread"
                 className="messages__section messages__section--thread js-messages-section">
              <header className="messages__header">
                <div className="messages__hero" style={{ 'background-image': 'url(images/images/1.jpg)' }}>
                  <div className="messages__hero-overlay" />
                  <div className="messages__hero-box">
                    <div className="messages__hero-avatar">
                      <span className="avatar" style={{ 'background-image': 'url(images/avatars/ava_6.png)' }}>
                        <img className="avatar__img" src="images/avatars/ava_6.png" alt="vladaserb" />
                      </span>
                    </div>
                    <div className="messages__hero-name">vladaserb</div>
                  </div>
                </div>
              </header>
              <div className="messages__body">
                <div className="scroller scroller--dark scroller--messages js-scroller">
                  <div className="scroller__pane js-scroller-pane">
                    <div className="messages__list">
                      <div className="messages__list-cell js-messages-list">
                        { thread }
                      </div>
                    </div>
                  </div>
                  <div className="scroller__track js-scroller-track">
                    <div className="scroller__bar js-scroller-bar"></div>
                  </div>
                </div>
              </div>
              <footer className="messages__footer">
                <div className="message-form">
                  <span className="messages__user-avatar">
                    <span className="avatar avatar--eighth">
                      <span className="avatar__text">M</span>
                    </span>
                  </span>
                  <textarea className="message-form__textarea" placeholder="Ваше сообщение…"></textarea>
                </div>
              </footer>
            </div>`
