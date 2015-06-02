import Image from '../../../../shared/react/components/common/Image';

let FlowBrickAvatar = React.createClass({
  propTypes: {
    flowpic: React.PropTypes.object.isRequired
  },

  render() {
    return <Image image={this.getImage()} />;
  },

  getImage() {
    return {
      url: this.props.flowpic.original_url,
      geometry: {
        width: 362,
        height: 180
      }
    };
  }
});

export default FlowBrickAvatar;