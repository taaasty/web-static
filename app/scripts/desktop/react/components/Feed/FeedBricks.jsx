import EntryBrick from '../Entry/EntryBrick';
import Masonry from 'masonry-layout';
// import InfiniteScroll from '../common/infiniteScroll/index';

let FeedBricks = React.createClass({
  propTypes: {
    entries: React.PropTypes.array,
    sinceEntryID: React.PropTypes.number,
    loadLimit: React.PropTypes.number
  },

  getDefaultProps() {
    return {
      // entries: [],
      entries: props.entries,
      sinceEntryID: null,
      loadLimit: 10
    };
  },

  getInitialState() {
    return {
      entries: this.props.entries
    };
  },

  componentDidMount() {
    this.initGridManager()
  },

  componentDidUpdate(prevProps) {
    if (this.state.entries.length !== prevProps.entries.length) {
      this.msnry.reloadItems();
      // this.initGridManager()
    }
  },

  render() {
    let entryList = this.state.entries.map((entry) => {
      return <EntryBrick entry={entry} key={entry.id} />;
    });

    return (
      <div className="bricks-wrapper">
        <section ref="container" className="bricks">
          {entryList}
        </section>
      </div>
    );
  },

  initGridManager() {
    this.msnry = new Masonry(this.refs.container.getDOMNode(), {
      itemSelector: '.brick',
      transitionDuration: '0.4s',
      isFitWidth: true,
      gutter: 20,
      hiddenStyle: {
        opacity: 0,
        transform: 'opacity(0.001)'
      },
      visibleStyle: {
        opacity: 1,
        transform: 'opacity(1)'
      }
    });
  }
});

export default FeedBricks;