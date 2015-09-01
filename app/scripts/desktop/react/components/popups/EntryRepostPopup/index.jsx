import React, { Component, PropTypes } from 'react';
import EntryActionCreators from '../../../actions/Entry';
import FlowActionCreators from '../../../actions/Flow';
import Scroller from '../../common/scroller/scroller';
import RelativePopup from '../RelativePopup';
import EntryRepostTargetItem from './EntryRepostTargetItem';

export default class EntryRepostPopup extends Component {
  static propTypes = {
    entryID: PropTypes.number.isRequired,
  }
  state = {
    isLoading: true,
    isLoadingMore: false,
    isError: false,
    targetList: [],
    nextPage: 1
  }
  componentDidMount() {
    this.loadTargets.call(this);
  }
  render() {
    return (
      <RelativePopup
        {...this.props}
        title={i18n.t('entry_repost_header')}
        className="popup--dark"
        hasActivities={this.state.isLoading || this.state.isLoadingMore}>
        <Scroller
          className="scroller--users"
          onScroll={this.handleScroll.bind(this)}
        >
          {this.state.targetList.length && !this.state.isLoading
            ? this.renderTargetList.call(this)
            : this.renderMessage.call(this)
          }
        </Scroller>
      </RelativePopup>
    );
  }
  renderTargetList() {
    const items = this.state.targetList.map((target) => (
      <EntryRepostTargetItem
        key={target.id}
        target={target}
        onSelect={this.handleTargetSelect.bind(this, target)} />
    ));

    return <section className="users">{items}</section>;
  }
  renderMessage() {
    let message = '';

    if (this.state.isError) {
      message = i18n.t('entry_repost_error');
    } else if (this.state.isLoading) {
      message = i18n.t('entry_repost_loading');
    } else if (this.state.targetList.length === 0) {
      message = i18n.t('entry_repost_empty');
    }

    return (
      <div className="grid-full">
        <div className="grid-full__middle">
          <div className="popup__text">{message}</div>
        </div>
      </div>
    );
  }
  loadTargets() {
    const loadingState = this.state.nextPage > 1 ? 'isLoadingMore' : 'isLoading';
    const data = { page: this.state.nextPage };

    this.setState({ [loadingState]: true, isError: false });
    FlowActionCreators.loadMine(data)
      .then((flowsInfo) => {
        this.setState({
          targetList: this.state.targetList.concat(flowsInfo.items.map((item) => item.flow)),
          hasMore: flowsInfo.has_more,
          nextPage: flowsInfo.next_page
        });
      })
      .fail(() => this.setState({ hasMore: false, isError: true }))
      .always(() => this.setState({ [loadingState]: false }))
  }
  handleTargetSelect(target) {
    EntryActionCreators.repost(this.props.entryID, target.id)
      .then(this.props.onClose);
  }
  handleScroll(e) {
    if (!this.state.hasMore || this.state.isLoading || this.state.isLoadingMore) {
      return;
    }

    const el = e.target;
    if (el.scrollTop + el.offsetHeight > el.scrollHeight * .9) {
      this.loadTargets();
    }
  }
}