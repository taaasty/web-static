import React, { PropTypes } from 'react';
import ScreenViewer from '../screen_viewer/screen_viewer';
import EntryBricksContainer from '../EntryBricks/EntryBricksContainer';

class LandingPageBody {
  render() {
    const { bricksContainer, locale, sourceImages, title } = this.props;
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
        </div>
      </div>
    );
  }
}

LandingPageBody.propTypes = {
  bricksContainer: EntryBricksContainer.propTypes,
  locale: PropTypes.string,
  sourceImages: PropTypes.array.isRequired,
  title: PropTypes.string,
}

export default LandingPageBody;
