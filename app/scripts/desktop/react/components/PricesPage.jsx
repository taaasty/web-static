/*global i18n */
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import InfoPageFooter from './InfoPageFooter';
import { setBodyLayoutClassName } from '../helpers/htmlHelpers';

class PricesPage extends Component {
  componentDidMount() {
    setBodyLayoutClassName('layout--info');
  }
  render() {
    const title = i18n.t('prices.title');

    return (
      <div className="page__inner">
        <div className="page__paper">
          <div className="page-body">
            <div className="layout-outer">
              <Helmet title={title} />
              <div className="prices-contents">
                <h1>
                  Платные услуги
                </h1>
                <p>
                  Tasty является бесплатным сервисом, но предоставляет ряд дополнительные платных услуг.
                </p>
                <ul>
                  <li>
                    <em>Закрепление поста</em> – ваш пост будет закреплен в самом верху страницы Прямой эфир. Стоимость 49 руб. за первые 3 часа закрепления и 10 руб. за каждый последующий час.
                  </li>
                  <li>
                    <em>Закрепление потока</em> – ваш поток будет закреплен в самом верху страницы Потоки. Стоимость 99 руб. за каждый день закрепления.
                  </li>
                  <li>
                    <em>Расширенные настройки дизайна</em> – новые шрифты и цвета для оформления тлога. Стоимость 99 руб.
                  </li>
                </ul>
                <InfoPageFooter />
              </div>
            </div>
          </div>
        </div>
      </div>  
    );
  }
}

PricesPage.displayName = 'PricesPage';

export default PricesPage;
