/*global i18n */
import React, { Component, PropTypes } from 'react';
import Tooltip from './Tooltip';

const defaultImg = 'http://taaasty.com/favicons/mstile-310x310.png';

function parseTitle(title) {
  if (!title) {
    return i18n.t('tasty');
  }

  const el = document.createElement('div');

  el.innerHtml = title;
  return el.innerText || el.text || el.textContent;
}

export function open(type, url, ev) {
  function openShare(url) {
    window.open(url, 'share', 'toolbar=0,status=0,scrollbars=1,width=626,height=436');
    return false;
  }

  ev.preventDefault();
  if (window.ga) {
    window.ga('send', 'event', 'UX', 'ShareSocial', type, {
      hitCallback: openShare.bind(null, url),
    });
  } else {
    openShare(url);
  }
}

export function facebookUrl(url) {
  const eUrl = window.encodeURIComponent(url);

  return `https://www.facebook.com/sharer/sharer.php?u=${eUrl}`;
}

export function vkontakteUrl(url, title, img) {
  const eUrl = window.encodeURIComponent(url);
  const eTitle = window.encodeURIComponent(parseTitle(title));
  const eImg = window.encodeURIComponent(img);

  return `http://vk.com/share.php?url=${eUrl}&title=${eTitle}&image=${eImg}`;
}

export function twitterUrl(url, title) {
  const eUrl = window.encodeURIComponent(url);
  const eTitle = window.encodeURIComponent(parseTitle(title));

  return  `http://twitter.com/share?url=${eUrl}&text=${eTitle}`;
}

class SocialShare extends Component {
  render() {
    const { img, title, url } = this.props;

    const fbUrl = facebookUrl(url);
    const vkUrl = vkontakteUrl(url, title, img);
    const twUrl = twitterUrl(url, title);

    return (
      <div className="social-share">
        <a
          href={fbUrl}
          onClick={open.bind(null, 'Facebook', fbUrl)}
          target="social"
        >
          <Tooltip
              placement="left"
              title={i18n.t('buttons.share.fb')}
          >
            <button className="social-share-facebook-button">
              fb
            </button>
          </Tooltip>
        </a>
        <a
          href={vkUrl}
          onClick={open.bind(null, 'Vk', vkUrl)}
          target="social"
        >
          <Tooltip
              placement="left"
              title={i18n.t('buttons.share.vk')}
          >
            <button className="social-share-vkontakte-button">
              vk
            </button>
          </Tooltip>
        </a>
        <a
          href={twUrl}
          onClick={open.bind(null, 'Twitter', twUrl)}
          target="social"
        >
          <Tooltip
              placement="left"
              title={i18n.t('buttons.share.twitter')}
          >
            <button className="social-share-twitter-button">
              t
            </button>
          </Tooltip>
        </a>
      </div>
    );
  }
}

SocialShare.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

SocialShare.defaultProps = {
  img: defaultImg,
};

export default SocialShare;
