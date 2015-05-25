import EntryBrick from '../Entry/EntryBrick';
import InfiniteScroll from '../common/infiniteScroll/index';
import MasonryMixin from 'react-masonry-mixin';

const masonryOptions = {
  itemSelector: '.brick',
  transitionDuration: 0,
  isFitWidth: true,
  gutter: 20
};

let FeedBricks = React.createClass({
  mixins: [MasonryMixin('masonryContainer', masonryOptions)],

  propTypes: {
    entries: React.PropTypes.array.isRequired,
    loading: React.PropTypes.bool.isRequired,
    canLoad: React.PropTypes.bool.isRequired,
    onLoadMoreEntries: React.PropTypes.func.isRequired
  },

  render() {
    let entryList = this.props.entries.map((entry) => {
      return <EntryBrick entry={entry} key={entry.id} />;
    });

    return (
      <div className="bricks-wrapper">
        <InfiniteScroll
            loading={this.props.loading}
            canLoad={this.props.canLoad}
            onLoad={this.props.onLoadMoreEntries}>
          <section ref="masonryContainer" className="bricks">
            {entryList}
          </section>
        </InfiniteScroll>
      </div>
    );
  }
});

export default FeedBricks;