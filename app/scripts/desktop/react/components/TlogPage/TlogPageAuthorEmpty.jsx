/*global i18n */
import React, { PropTypes } from 'react';
import Routes from '../../../../shared/routes/routes';

class TlogPageAuthorEmpty {
  render() {
    const { name, slug } = this.props;
    const contents = i18n.t('tlog.author_no_posts', {
      name,
      newUrl: Routes.new_entry_url(slug),
      designSettingsUrl: Routes.userDesignSettings(slug),
      userSettingsUrl: Routes.userSettings(slug),
      friendsUrl: Routes.friends_feed_path(),
      email: 'support@taaasty.ru',
    });

    return (
      <section className="posts">
        <article>
          <div
            className="text-content"
            dangerouslySetInnerHTML={{ __html: contents }}
          />
        </article>
      </section>
    );
  }
}

TlogPageAuthorEmpty.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
};

export default TlogPageAuthorEmpty;
