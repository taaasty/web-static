import FlowActionCreators from '../../actions/Flow';
import FlowBricks from './FlowBricks';

let FlowBricksContainer = React.createClass({
  propTypes: {
    flows_info: React.PropTypes.shape({
      items: React.PropTypes.array.isRequired,
      has_more: React.PropTypes.bool.isRequired,
      next_since_flow_id: React.PropTypes.number
    }).isRequired,
    url: React.PropTypes.string.isRequired,
    limit: React.PropTypes.number
  },

  getInitialState() {
    return {
      flows: this.props.flows_info.items,
      hasMore: this.props.flows_info.has_more,
      sinceFlowID: this.props.flows_info.next_since_flow_id,
      loading: false
    };
  },

  render() {
    return (
      <FlowBricks
          flows={this.state.flows}
          loading={this.state.loading}
          canLoad={!this.state.loading && this.state.hasMore}
          onLoadMoreFlows={this.loadMoreFlows} />
    );
  },

  loadMoreFlows() {
    this.setState({loading: true});

    let { url, limit } = this.props;
    let { sinceFlowID } = this.state;

    FlowActionCreators.load(url, sinceFlowID, limit)
      .then((flowsInfo) => {
        if (this.isMounted()) {
          // Обрабатываем случай, когда передан левый урл. Если в ответе нет нужных
          // нам полей, просто прекращаем дальнейшую загрузку
          if (flowsInfo.has_more != null && flowsInfo.next_since_flow_id != null) {
            this.setState({
              flows: this.state.flows.concat(flowsInfo.items),
              hasMore: flowsInfo.has_more,
              sinceFlowID: flowsInfo.next_since_flow_id
            });
          } else {
            this.setState({hasMore: false});
          }
        }
      })
      .fail(() => {
        if (this.isMounted()) this.setState({hasMore: false})
      })
      .always(() => {
        if (this.isMounted()) this.setState({loading: false});
      });
  }
});

export default FlowBricksContainer;