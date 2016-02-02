import React, { PropTypes } from 'react';
import ScreenViewer from '../screen_viewer/screen_viewer';
import EntryBricksContainer from '../EntryBricks/EntryBricksContainer';

class LandingPageBody {
  renderFooter(link, title) {
    return (
      link &&
      title &&
      <div className="layout-constrain">
        <nav className="menu menu--main">
          <ul className="menu__list">
            <li className="menu__item">
              <a href={link}>
                <button className="auth-button">
                  {title}
                </button>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
  render() {
    const { bottomLinkUrl, bottomLinkTitle, bricksContainer, locale, sourceImages, title } = this.props;
    return (
      <div>
        <div className="page-cover">
          <ScreenViewer
            locale={locale}
            sourceImages={sourceImages}
          />
        </div>
        <div className="layout-outer">
          <h1
            className="home-title"
            dangerouslySetInnerHTML={{__html: title || ''}}
          />
          <EntryBricksContainer {...bricksContainer} />
          <footer className="page-footer">
            {this.renderFooter(bottomLinkUrl, bottomLinkTitle)}
          </footer>
        </div>
      </div>
    );
  }
}
LandingPageBody.propTypes = {
  bottomLinkTitle: PropTypes.string,
  bottomLinkUrl: PropTypes.string,
  bricksContainer: PropTypes.shape(EntryBricksContainer.propTypes),
  locale: PropTypes.string,
  sourceImages: PropTypes.array.isRequired,
  title: PropTypes.string,
}

export default LandingPageBody;
