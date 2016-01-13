import React, { PropTypes } from 'react';

export default class EntryTlogCommentsLoadMore {
  static propTypes = {
    totalCount: PropTypes.number.isRequired,
    loadedCount: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    limit: PropTypes.number.isRequired,
  };
  render() {
    return (
      <div className="comments__more" onClick={this.props.onLoadMore}>
        <a className="comments__more-link">
          {this.getTitle()}
          {' '}{this.renderSpinner()}
        </a>
      </div>
    );
  }
  renderSpinner() {
    if (this.props.loading) return <Spinner size={8} />;
  }
  getTitle() {
    const remainingCount = this.props.totalCount - this.props.loadedCount,
          possibleCount  = this.props.loadedCount + this.props.limit;

    if (possibleCount < this.props.totalCount) {
      return i18n.t('load_more_comments', { count: this.props.limit });
    } else {
      return i18n.t('load_more_comments_remaining', { count: remainingCount });
    }
  }
}
