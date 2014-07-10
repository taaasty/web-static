###* @jsx React.DOM ###
#
module.experts = window.PostActions = React.createClass

  render: ->
    `<div className="post-actions">
      <div className="post-action post-action--loader">
        <span className="spinner spinner--8x8">
          <span className="spinner__icon"></span>
        </span>
        </div><div className="post-action post-action--button">
        <button className="button button--grey">
          <span className="button__text">Предпросмотр</span>
        </button>
        </div><div className="post-action post-action--button">
        <div className="button-group js-dropdown">
          <button className="button button--green">
            <span className="button__text">Опубликовать</span>
            </button><button className="button button--green-dark post-settings-button state--unlock" data-element="dropdown-toggle">
            <span className="icon"></span>
          </button>
          <div className="dropdown-popup dropdown-popup--green-dark" data-element="dropdown-menu">
            <ul className="dropdown-popup__list">
              <li className="dropdown-popup__item">
              <a className="dropdown-popup__link" href="#" title="Видна только мне">
                <i className="icon icon--lock"></i> Видна только мне
              </a>
              </li>
              <li className="dropdown-popup__item">
              <a className="dropdown-popup__link state--active" href="#" title="Видна всем в моем тлоге" data-value="unlock">
                <i className="icon icon--unlock"></i> Видна всем в моем тлоге
              </a>
              </li>
              <li className="dropdown-popup__item">
              <a className="dropdown-popup__link" href="#" title="Публичная в прямой эфир" data-value="live">
                <i className="icon icon--wave"></i> Публичная в прямой эфир
              </a>
              </li>
              <li className="dropdown-popup__item">
              <a className="dropdown-popup__link" href="#" title="Публичная с голосованием" data-value="rating">
                <i className="icon icon--rating"></i> Публичная с голосованием
              </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    `

