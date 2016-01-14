import React, { Component, PropTypes } from 'react';
import FlowActionCreators from '../../actions/Flow';
import FlowBricks from './FlowBricks';

export default class FlowBricksContainer extends Component {
  static propTypes = {
    flows_info: PropTypes.shape({
      items: PropTypes.array.isRequired,
      limit: PropTypes.number.isRequired,
      has_more: PropTypes.bool.isRequired,
      next_page: PropTypes.number.isRequired,
    }).isRequired,
    loadUrl: PropTypes.string.isRequired,
  };
  state = {
    flows: this.props.flows_info.items,
    hasMore: this.props.flows_info.has_more,
    nextPage: this.props.flows_info.next_page,
    isLoading: false,
  };
  render() {
    return (
      <FlowBricks
        flows={this.state.flows}
        loading={this.state.isLoading}
        canLoad={!this.state.isLoading && this.state.hasMore}
        onLoadMoreFlows={this.loadMoreFlows.bind(this)}
      />
    );
  }
  loadMoreFlows() {
    const data = {
      page: this.state.nextPage,
      limit: this.props.flows_info.limit
    };

    this.setState({ isLoading: true });
    FlowActionCreators.load(this.props.loadUrl, data)
      .then((flowsInfo) => {
        // Обрабатываем случай, когда передан левый урл. Если в ответе нет нужных
        // нам полей, просто прекращаем дальнейшую загрузку
        if (flowsInfo.has_more != null) {
          this.setState({
            flows: this.state.flows.concat(flowsInfo.items),
            hasMore: flowsInfo.has_more,
            nextPage: flowsInfo.next_page
          });
        } else {
          this.setState({ hasMore: false });
        }
      })
      .fail(() => this.setState({ hasMore: false }))
      .always(() => this.setState({ isLoading: false }))
  }
}
