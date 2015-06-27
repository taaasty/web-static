import React, { PropTypes } from 'react';

export default class EntryTlogMetabarTags {
  static propTypes = {
    tags: PropTypes.array.isRequired,
    userSlug: PropTypes.string.isRequired
  }
  render() {
    return (
      <span className="meta-item meta-item--tags">
        <span className="meta-item__content">
          {this.props.tags.map(::this.renderTag)}
        </span>
      </span>
    );
  }
  renderTag(tag, idx) {
    let separator;

    if (idx < this.props.tags.length - 1) {
      separator = <span className="meta-item__common">, </span>;
    }

    return (
      <span key={`tag-${idx}`}>
        <a href={Routes.userTag(this.props.userSlug, tag)}
           target="_blank"
           className="meta-item__common meta-item__link">
          #{tag}
        </a>
        {separator}
      </span>
    );
  }
}