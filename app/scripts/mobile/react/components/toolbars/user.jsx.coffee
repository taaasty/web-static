###* @jsx React.DOM ###

UserToolbar = React.createClass

  render: ->
   `<nav className="toolbar toolbar--user">
      <div className="toolbar__toggle">
        <i className="icon icon--menu" />
      </div>
      <div className="toolbar__popup">
        <ul className="toolbar__popup-list">
          <li className="toolbar__popup-item">
            <a className="toolbar__popup-link">
              <i className="icon icon--plus" />
              <span>Новая запись</span>
            </a>
          </li>
          <li className="toolbar__popup-item">
            <a className="toolbar__popup-link">
              <i className="icon icon--diary" />
                <span>Мой дневник</span>
              </a>
          </li>
          <li className="toolbar__popup-item">
            <a className="toolbar__popup-link">
              <i className="icon icon--profile" />
                <span>Профиль</span>
              </a>
          </li>
          <li className="toolbar__popup-item">
            <a className="toolbar__popup-link">
              <i className="icon icon--star" />
                <span>Избранное</span>
              </a>
          </li>
          <li className="toolbar__popup-item">
            <a className="toolbar__popup-link">
              <i className="icon icon--anonymous" />
                <span>Новая анонимка</span>
              </a>
          </li>
          <li className="toolbar__popup-item">
            <a className="toolbar__popup-link">
              <i className="icon icon--lock" />
                <span>Скрытые записи</span>
              </a>
          </li>
          <li className="toolbar__popup-item">
            <a className="toolbar__popup-link">
              <i className="icon icon--messages" />
                <span>Сообщения</span>
              </a>
          </li>
          <li className="toolbar__popup-item">
            <a className="toolbar__popup-link">
              <i className="icon icon--friends" />
                <span>Друзья</span>
              </a>
          </li>
          <li className="toolbar__popup-item">
            <a className="toolbar__popup-link">
              <i className="icon icon--drawing" />
                <span>Дизайн дневника</span>
              </a>
          </li>
          <li className="toolbar__popup-item">
            <a className="toolbar__popup-link">
              <i className="icon icon--cogwheel" />
                <span>Настройки</span>
              </a>
          </li>
          <li className="toolbar__popup-item">
            <a className="toolbar__popup-link">
              <i className="icon icon--logout" />
                <span>Выйти</span>
              </a>
          </li>
        </ul>
      </div>
    </nav>`

module.exports = UserToolbar