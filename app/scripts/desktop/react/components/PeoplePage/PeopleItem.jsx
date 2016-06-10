/*global i18n */
import React, { Component, PropTypes } from 'react';
import UserAvatar from '../UserAvatar';
import UserSlug from '../UserSlug';
import RelationButton from '../common/RelationButton';
import CurrentUserStore from '../../stores/current_user';
import { Link } from 'react-router';
import uri from 'urijs';

class PeopleItem extends Component{
  state = { relState: this.props.user.my_relationship };
  handleButtonClick(ev) {
    ev.preventDefault();
    ev.stopPropagation();
  }
  render() {
    const { user } = this.props;
    const { relState } = this.state;
    const styles = user.design && user.design.backgroundImageEnabled
          ? { backgroundImage: `url("${user.design.backgroundImageUrl}")` }
          : {};

    return (
      <article className="people-item" style={styles}>
        <div className="people-item__inner">
          <Link className="people-item__link" to={uri(user.tlog_url).path()}>
            <div className="people-item__avatar">
              <UserAvatar size={60} user={user} />
            </div>
            <div className="people-item__name" title={user.slug}>
              <UserSlug user={user} />
            </div>
            <div className="people-item__footer">
              <div
                className="people-item__desc"
                dangerouslySetInnerHTML={{ __html: user.title || '' }}
              />
              <div className="people-item__followers-count">
                {user.followers_count}
                <div className="people-item__followers-text">
                  {i18n.t('people.followers_count', { count: user.followers_count })}
                </div>
              </div>
              <div className="people-item__follow-button" onClick={this.handleButtonClick}>
                {relState && 
                 <RelationButton
                   objectID={CurrentUserStore.getUserID()}
                   onStateChange={(relState) => this.setState({ relState })}
                   relState={relState}
                   subjectID={user.id}
                   subjectPrivacy={user.is_privacy}
                 />
                }
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
  title: PropTypes.string,
  user: PropTypes.object.isRequired,
};

export default PeopleItem;
