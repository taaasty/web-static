import FlowBrick from '../Flow/FlowBrick';
import InfiniteScroll from '../common/infiniteScroll/index';
import MasonryMixin from 'react-masonry-mixin';

const masonryOptions = {
  itemSelector: '.brick',
  transitionDuration: 0,
  isFitWidth: true,
  gutter: 20
};

let Bricks = React.createClass({
  mixins: [MasonryMixin('masonryContainer', masonryOptions)],

  propTypes: {
    flows: React.PropTypes.array.isRequired,
    loading: React.PropTypes.bool.isRequired,
    canLoad: React.PropTypes.bool.isRequired,
    onLoadMoreFlows: React.PropTypes.func.isRequired
  },

  render() {
    let entryList = this.props.flows.map((item) => {
      return (
        <FlowBrick
            flow={item.flow}
            relationship={item.relationship}
            key={item.flow.id} />
      );
    });

    return (
      <div className="bricks-wrapper">
        <InfiniteScroll
            loading={this.props.loading}
            canLoad={this.props.canLoad}
            onLoad={this.props.onLoadMoreFlows}>
          <section ref="masonryContainer" className="bricks">
            {entryList}
          </section>
        </InfiniteScroll>
      </div>
    );
  }
});

export default Bricks;