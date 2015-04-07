import PositionsService from '../../services/positions';

const REPOSITION_TIMEOUT = 500;

function managePositions(Component) {
  const PositionManager = React.createClass({
    propTypes: {
      clue: React.PropTypes.string.isRequired,
      position: React.PropTypes.object
    },

    getDefaultProps() {
      return {
        position: {left: 50, top: 50}
      };
    },

    getInitialState() {
      let position = PositionsService.restorePosition(this.props.clue) || this.props.position;

      return {
        position: PositionsService.smartPosition(position)
      }
    },

    componentDidMount() {
      $(window).on('resize', this.moveIfOutside);
    },
    
    componentWillUnmount() {
      $(window).off('resize', this.moveIfOutside);
    },

    render() {
      return (
        <Component {...this.props} {...this.state}
            onPositionChange={this.changePosition} />
      );
    },

    changePosition(position) {
      this.moveIfOutside();
      this.savePosition(position);
    },

    moveIfOutside() {
      let currentPosition = $(this.getDOMNode()).position(),
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
    }
  });

  return PositionManager;
};

export default managePositions;