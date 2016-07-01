/*global i18n */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { repostEntry } from '../../../actions/EntryActions';
import { getRepostFlows } from '../../../actions/RepostFlowsActions';
import fuzzy from 'fuzzy';
import PopupHeader from '../../Popup/Header';
import Scroller from '../../common/Scroller';
import EntryRepostTargetItem from './EntryRepostTargetItem';
import EntryRepostTargetSearch from './EntryRepostTargetSearch';
import Routes from '../../../../../shared/routes/routes';
import { Map } from 'immutable';

const emptyFlow = Map();

class EntryRepostPopup extends Component {
  state = {
    pattern: '',
  };
  componentDidMount() {
    this.props.getRepostFlows();
  }
  getVisibleList() {
    const { pattern } = this.state;
    const { flows } = this.props;
    const options = {
      extract(target) { return target.name; },
    };

    return fuzzy
      .filter(pattern, flows, options)
      .map((res) => flows[res.index]);
  }
  handleSearchChange(pattern) {
    this.setState({ pattern });
  }
  handleTargetSelect(target) {
    this.props.repostEntry(this.props.entryId, target.id)
      .then(this.props.onClose);
  }
  handleScroll(e) {
    const { getRepostFlows, hasMore, isFetching } = this.props;

    if (!hasMore || isFetching) {
      return;
    }

    const el = e.target;
    if (el.scrollTop + el.offsetHeight > el.scrollHeight * .9) {
      getRepostFlows();
    }
  }
  renderMessage(msg) {
    const { error, isFetching } = this.props;
    const flows = this.getVisibleList();
    const message = error ? i18n.t('entry.repost.error')
      : isFetching ? i18n.t('entry.repost.loading')
      : flows.length === 0 ? i18n.t('entry.repost.empty')
      : msg;

    return (
      <div className="grid-full">
        <div className="grid-full__middle">
          <div className="popup__text" dangerouslySetInnerHTML={{ __html: message }} />
        </div>
      </div>
    );
  }
  renderAddFlowMessage() {
    return this.props.flows.length <= 1 &&
      this.renderMessage(i18n.t('entry.repost.no_flows', { flowsLink: Routes.flows() }));
  }
  renderSearch() {
    const { isFetching, flows } = this.props;

    return (flows.length && !isFetching) && (
      <EntryRepostTargetSearch onChange={this.handleSearchChange.bind(this)} />
    );
  }
  renderTargetList() {
    const list = this.getVisibleList();
    const items = list.map((target) => (
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
  render() {
    const { isFetching, nextPage, onClose } = this.props;
    const list = this.getVisibleList();

    return (
      <div className="popup popup--dark popup--repost">
        <div className="popup__arrow popup__arrow--down" />
        <PopupHeader
          draggable={false}
          onClose={onClose}
          showSpinner={isFetching}
          title={i18n.t('entry.repost.header')}
        />
        <div className="popup__body">
          {this.renderSearch.call(this)}
          <Scroller className="scroller--users" onScroll={this.handleScroll.bind(this)}>
            {list.length && !(isFetching && !nextPage)
             ? this.renderTargetList()
             : this.renderMessage()
            }
          </Scroller>
        </div>
      </div>
    );
  }
}

EntryRepostPopup.propTypes = {
  entryId: PropTypes.number.isRequired,
  error: PropTypes.object,
  flows: PropTypes.array.isRequired,
  getRepostFlows: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  nextPage: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  repostEntry: PropTypes.func.isRequired,
};

export default connect(
  (state, { entryId, onClose }) => {
    const { data: { items, hasMore, nextPage }, isFetching, error } = state.repostFlows;
    const repostFlows = items.map((id) => state.entities.getIn([ 'flow', String(id) ], emptyFlow).toJS());

    return {
      entryId,
      error,
      hasMore,
      isFetching,
      nextPage,
      onClose,
      flows: [ state.currentUser.data ].concat(repostFlows),
    };
  },
  { repostEntry, getRepostFlows }
)(EntryRepostPopup);
