import React, { Component, PropTypes } from 'react';
import Color from 'color';
import * as ProjectTypes from '../../../../shared/react/ProjectTypes';
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
    const { currentUserId, isCurrentUser, onRelStateChange,
            relationship, user } = this.props;

    return (
      <div ref="container">
        <style>
          {this.state.extraStyles}
        </style>
        {isCurrentUser
           ? <HeroProfileSelfActions />
           : relationship &&
             <HeroProfileActions
               currentUserId={currentUserId}
               onRelStateChange={onRelStateChange}
               relationship={relationship}
               user={user}
             />
        }
      </div>
    );
  }
}

HeroProfileActionsContainer.propTypes = {
  currentUserId: PropTypes.number,
  isCurrentUser: PropTypes.bool.isRequired,
  onRelStateChange: PropTypes.func.isRequired,
  relationship: PropTypes.string,
  user: ProjectTypes.heroUser,
};

export default HeroProfileActionsContainer;
