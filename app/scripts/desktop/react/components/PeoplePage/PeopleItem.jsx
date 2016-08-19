/*global i18n */
import React, { Component, PropTypes } from 'react';
import UserAvatar from '../UserAvatar';
import UserSlug from '../UserSlug';
import RelationButton from '../RelationButton';
import { Link } from 'react-router';
import uri from 'urijs';

class PeopleItem extends Component{
  handleButtonClick(ev) {
    ev.preventDefault();
    ev.stopPropagation();
  }
  render() {
    const { user } = this.props;
    const relId = user.get('myRelationshipObject', false);
    const bgImageEnabled = user.getIn([ 'design', 'backgroundImageEnabled' ], false);
    const styles = bgImageEnabled
          ? { backgroundImage: `url("${user.getIn([ 'design', 'backgroundImageUrl' ], '')}")` }
          : {};

    return (
      <article className="people-item" style={styles}>
        <div className="people-item__inner">
          <Link className="people-item__link" to={uri(user.get('tlogUrl', '')).path()}>
            <div className="people-item__avatar">
              <UserAvatar size={60} user={user.toJS()} />
            </div>
            <div className="people-item__name" title={user.get('slug')}>
              <UserSlug user={user} />
            </div>
            <div className="people-item__footer">
              <div
                className="people-item__desc"
                dangerouslySetInnerHTML={{ __html: user.get('title', '') }}
              />
              <div className="people-item__followers-count">
                {user.get('followersCount')}
                <div className="people-item__followers-text">
                  {i18n.t('people.followers_count', { count: user.get('followersCount') })}
                </div>
              </div>
              <div className="people-item__follow-button" onClick={this.handleButtonClick}>
                {relId && <RelationButton relId={relId} />}
              </div>
            </div>
          </Link>
        </div>
      </article>
    );
  }
}

PeopleItem.displayName = 'PeopleItem';

PeopleItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default PeopleItem;
