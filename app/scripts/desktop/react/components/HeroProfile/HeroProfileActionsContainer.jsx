import React, { Component, PropTypes } from 'react';
import Color from 'color';
import HeroProfileActions from './HeroProfileActions';
import HeroProfileSelfActions from './HeroProfileSelfActions';

class HeroProfileActionsContainer extends Component {
  state = {
    extraStyles: '',
  };
  componentDidMount() {
    const container = this.refs.container;
    if (container) {
      // #fff is a fallback color to pass headless browser tests
      const currentColor = window.getComputedStyle(container).getPropertyValue('color') || '#fff';
      const contrastColor = Color(currentColor).luminosity() > 0.5 ? 'black' : 'white';

      const extraStyles = `
        .hero__actions button {
           background-color: ${currentColor}; 
           opacity: 0.6;
        }
        .hero__actions button:before {
          border: none;
        }
        .hero__actions button:hover { opacity: 1; }
        .hero__actions,
        .hero__actions button.button--outline {
          color: ${contrastColor}!important;
        }
      `;
      this.setState({ extraStyles });
    }
  }
  render() {
    const { isCurrentUser, showSettingsPopup, tlog, tlogRelation } = this.props;

    return (
      <div ref="container">
        <style>
          {this.state.extraStyles}
        </style>
        {isCurrentUser
           ? <HeroProfileSelfActions showSettingsPopup={showSettingsPopup} />
           : !tlogRelation.isEmpty() &&
             <HeroProfileActions
               myRelState={tlogRelation.get('state')}
               tlog={tlog}
             />
        }
      </div>
    );
  }
}

HeroProfileActionsContainer.propTypes = {
  isCurrentUser: PropTypes.bool.isRequired,
  showSettingsPopup: PropTypes.func.isRequired,
  tlog: PropTypes.object.isRequired,
  tlogRelation: PropTypes.object.isRequired,
};

export default HeroProfileActionsContainer;
