/*global Routes, i18n */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { repostEntry } from '../../../actions/EntryActions';
import { loadAvailableFlows } from '../../../actions/FlowActions';
import fuzzy from 'fuzzy';
import Popup from '../../Popup';
import Scroller from '../../common/Scroller';
import EntryRepostTargetItem from './EntryRepostTargetItem';
import EntryRepostTargetSearch from './EntryRepostTargetSearch';

class EntryRepostPopup extends Component {
  state = {
    targetList: [CurrentUserStore.getUser()],
    visibleList: [CurrentUserStore.getUser()],
    nextPage: 1,
    pattern: '',
    isLoading: true,
    isLoadingMore: false,
    isError: false,
  };
  componentDidMount() {
    this.loadTargets();
  }
  loadTargets() {
    const loadingState = this.state.nextPage > 1 ? 'isLoadingMore' : 'isLoading';
    const data = { page: this.state.nextPage };

    this.setState({ [loadingState]: true, isError: false });
    this.props.loadAvailableFlows(data)
      .then((flowsInfo) => {
        const list = this.state.targetList.concat(flowsInfo.items.map((item) => item.flow));

        this.setState({
          targetList: list,
          visibleList: this.getVisibleList(list, this.state.pattern),
          hasMore: flowsInfo.has_more,
          nextPage: flowsInfo.next_page,
        });
      })
      .fail(() => this.setState({ hasMore: false, isError: true }))
      .always(() => this.setState({ [loadingState]: false }));
  }
  getVisibleList(list, pattern) {
    const options = {
      extract(target) { return target.name; },
    };

    return fuzzy
      .filter(pattern, list, options)
      .map((res) => list[res.index]);
  }
  handleSearchChange(pattern) {
    this.setState({
      pattern,
      visibleList: this.getVisibleList(this.state.targetList, pattern),
    });
  }
  handleTargetSelect(target) {
    this.props.repostEntry(this.props.entryId, target.id)
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
  renderMessage(message) {
    return (
      <div className="grid-full">
        <div className="grid-full__middle">
          <div className="popup__text"
            dangerouslySetInnerHTML={{__html: message}}
          />
        </div>
      </div>
    );
  }
  renderAddFlowMessage() {
    return this.state.targetList.length <= 1 &&
      this.renderMessage(i18n.t('entry.repost.no_flows', { flowsLink: Routes.flows}));
  }
  renderSearch() {
    return (this.state.targetList.length && !this.state.isLoading) && (
      <EntryRepostTargetSearch
        onChange={this.handleSearchChange.bind(this)}
        targetList={this.state.targetList}
      />
    );
  }
  renderTargetList() {
    const items = this.state.visibleList.map((target) => (
      <EntryRepostTargetItem
        key={target.id}
        onSelect={this.handleTargetSelect.bind(this, target)}
        target={target}
      />
    ));

    return [
      <section className="users">{items}</section>,
      this.renderAddFlowMessage(),
    ];
  }
  renderListStateMessage() {
    let message = '';

    if (this.state.isError) {
      message = i18n.t('entry_repost_error');
    } else if (this.state.isLoading) {
      message = i18n.t('entry_repost_loading');
    } else if (this.state.visibleList.length === 0) {
      message = i18n.t('entry_repost_empty');
    }

    return this.renderMessage(message);
  }
  render() {
    return (
      <RelativePopup {...this.props}
        className="popup--dark popup--repost"
        hasActivities={this.state.isLoading || this.state.isLoadingMore}
        title={i18n.t('entry_repost_header')}
      >
        {this.renderSearch.call(this)}
        <Scroller
          className="scroller--users"
          onScroll={this.handleScroll.bind(this)}
        >
          {this.state.visibleList.length && !this.state.isLoading
            ? this.renderTargetList.call(this)
            : this.renderListStateMessage.call(this)
          }
        </Scroller>
      </RelativePopup>
    );
  }
}

EntryRepostPopup.propTypes = {
  entryId: PropTypes.number.isRequired,
  loadAvailableFlows: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  repostEntry: PropTypes.func.isRequired,
};

export default connect(
  (state, ownProps) => ownProps,
  { repostEntry, loadAvailableFlows }
)(EntryRepostPopup);
