import React, { Children, Component } from 'react';
import cloneWithProps from 'react-addons-clone-with-props';

import HeroProfile from '../HeroProfile';
import SocialShare from '../common/SocialShare';
import Auth from '../Auth';

const defaultUserpic = '//taaasty.com/favicons/mstile-310x310.png';

class TlogPageRoot extends Component {
  shareImg(user) {
    return (user && user.userpic && user.userpic.original_url)
      ? user.userpic.original_url
      : defaultUserpic;
  }
  render() {
    const { children, currentUserId, isLogged, queryString, locale,
            section, tlog, tlogEntries, tlogEntry } = this.props;
    const { author, design: { backgroundImageUrl },
            my_relationship, slug, stats, tlog_url } = tlog;
    const childrenWithProps = Children.map(
      children,
      (child) => cloneWithProps(child, { currentUserId, tlog, tlogEntries, tlogEntry })
    );

    return (
      <div className="page">
        <div className="page__inner">
          <div className="page__paper">
            <div className="page-cover js-cover" style={{ backgroundImage: `url('${backgroundImageUrl}')` }} />
            <header className="page-header">
              <HeroProfile
                locale={locale}
                relationship={my_relationship}
                stats={stats}
                user={author}
              />
            </header>
            {childrenWithProps}
          </div>
        </div>
        {!isLogged && <Auth fixed locale={locale} />}
        <SocialShare
          img={this.shareImg(author)}
          title={slug}
          url={tlog_url}
        />  
      </div>
    );
  }
}

export default TlogPageRoot;
