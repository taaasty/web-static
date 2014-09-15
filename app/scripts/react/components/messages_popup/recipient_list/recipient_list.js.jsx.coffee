###* @jsx React.DOM ###

window.MessagesPopup_RecipientList = React.createClass

  render: ->
   `<div data-section="recipients"
             data-title="Cоздать переписку"
             className="messages__section messages__section--recipients js-messages-section">
      <div className="messages__body">
        <div className="messages__box">
          <div className="messages__chooser js-messages-chooser">
            <div className="messages__chooser-button js-messages-chooser-button">
              <span className="messages__chooser-button-text">Введите имя</span>
            </div>
            <div className="messages__chooser-dropdown">
              <input type="text"
                     value=""
                     className="messages__chooser-input js-messages-chooser-input" />
              <div className="messages__chooser-results js-messages-chooser-results" />
            </div>
          </div>
          <div className="messages__field">
            <input type="hidden"
                   data-placeholder="Введите имя"
                   style={{ 'width': '100%' }}
                   className="js-messages-select-recipients" />
          </div>
          <div className="messages__hint">Начните вводить имя друга, которому хотите написать сообщение</div>
        </div>
      </div>
    </div>`