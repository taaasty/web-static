import LazyLoadImage from '../../../../shared/react/components/common/LazyLoadImage';

let FlowBrickAvatar = React.createClass({
  propTypes: {
    flowpic: React.PropTypes.object.isRequired,
  },

  render() {
    return <LazyLoadImage image={this.getImage()} />;
  },

  getImage() {
    return {
      url: this.props.flowpic.original_url,
      geometry: {
        width: 362,
        height: 180,
      }
    };
  }
});

export default FlowBrickAvatar;
