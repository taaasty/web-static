###* @jsx React.DOM ###

FeedToolbar = React.createClass

  render: ->
   `<nav className="toolbar toolbar--feed">
      <div className="toolbar__toggle">
        <i className="icon icon--ribbon" />
      </div>
      <div className="toolbar__popup">
        <ul className="toolbar__popup-list">
          <li className="toolbar__popup-item">
            <a className="toolbar__popup-link">
              <i className="icon icon--friends" />
              <span>Подписки</span>
            </a>
          </li>
          <li className="toolbar__popup-item">
            <a className="toolbar__popup-link">
              <i className="icon icon--wave" />
              <span>Прямой эфир</span>
            </a>
          </li>
          <li className="toolbar__popup-item">
            <a className="toolbar__popup-link">
              <i className="icon icon--fire" />
              <span>Лучшее</span>
            </a>
          </li>
          <li className="toolbar__popup-item">
            <a className="toolbar__popup-link">
              <i className="icon icon--anonymous" />
              <span>Анонимки</span>
            </a>
          </li>
          <li className="toolbar__popup-item">
            <a className="toolbar__popup-link">
              <i className="icon icon--friends" />
              <span>Люди</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>`

module.exports = FeedToolbar