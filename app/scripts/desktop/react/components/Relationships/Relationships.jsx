import Scroller from '../common/scroller/scroller';
import RelationshipsList from './RelationshipsList';

const ERROR_STATE = 'error',
      LOADED_STATE = 'loaded',
      LOADING_STATE = 'loading';

let Relationships = React.createClass({
  propTypes: {
    relationships: React.PropTypes.array.isRequired,
    actions: React.PropTypes.array,
    state: React.PropTypes.string.isRequired,
    canLoad: React.PropTypes.bool.isRequired,
    onLoadMore: React.PropTypes.func.isRequired
  },

  render() {
    return (
      <Scroller className="scroller--relationships" onScroll={this.handleScroll}>
        {this.renderContent()}
      </Scroller>
    );
  },

  renderContent() {
    let message;

    if (this.props.state === LOADING_STATE && this.props.relationships.length === 0) {
      message = <Spinner size={15} />;
    } else if (this.props.state === ERROR_STATE) {
      message = 'Ошибка загрузки';
    } else {
      return (
        [
          <RelationshipsList
              relationships={this.props.relationships}
              actions={this.props.actions}
              key="relList" />,
          this.renderSpinner()
        ]
      );
    }

    return (
      <div className="grid-full">
        <div className="grid-full__middle">
          <div className="popup__text">
            {message}
          </div>
        </div>
      </div>
    );
  },

  renderSpinner() {
    if (this.props.state === LOADING_STATE) {
      return (
        <div className="loader" key="loader">
          <Spinner size={15} />
        </div>
      );
    }
  },

  handleScroll(e) {
    if (!this.props.canLoad || this.props.loading) return;

    let el = e.target;
    if (el.scrollTop + el.offsetHeight > el.scrollHeight * .9) {
      this.props.onLoadMore();
    }
  }
});

export default Relationships;