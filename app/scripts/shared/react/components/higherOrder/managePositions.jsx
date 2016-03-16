import React, { createClass, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import PositionsService from '../../services/positions';

const REPOSITION_TIMEOUT = 500;

function managePositions(Component) {
  const PositionManager = createClass({
    propTypes: {
      clue: PropTypes.string.isRequired,
      position: PropTypes.object,
      withBackground: PropTypes.bool,
    },

    getDefaultProps() {
      return {
        position: {left: 50, top: 50},
      };
    },

    getInitialState() {
      let position = PositionsService.restorePosition(this.props.clue) || this.props.position;

      // Для попапов с фоном не ставим отступы
      if (this.props.withBackground) {
        position = {left: 0, top: 0};
      }

      return {
        position: PositionsService.smartPosition(position),
      };
    },

    componentDidMount() {
      $(window).on('resize', this.moveIfOutside);
    },
    
    componentWillUnmount() {
      $(window).off('resize', this.moveIfOutside);
    },

    changePosition(position) {
      this.setState({ position });
      this.moveIfOutside();
      this.savePosition(position);
    },

    moveIfOutside() {
      let currentPosition = $(findDOMNode(this)).position(),
          smartPosition = PositionsService.smartPosition(currentPosition);

      if (smartPosition.left != currentPosition.left || smartPosition.top != currentPosition.top) {
        clearTimeout(this._repositionTimeout);
        this._repositionTimeout = setTimeout(() => {
          this.setState({position: smartPosition});
        }, REPOSITION_TIMEOUT);
      }
    },

    savePosition(position) {
      PositionsService.savePosition(this.props.clue, position);
    },

    render() {
      return (
        <Component
          {...this.props}
          {...this.state}
          onPositionChange={this.changePosition}
        />
      );
    },

  });

  return PositionManager;
};

export default managePositions;
