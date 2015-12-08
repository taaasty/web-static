/*global i18n */
import React from 'react';

class TlogPageEmpty {
  render() {
    return (
      <section className="posts">
        <article>
          <div className="text-content">
            <h2>
              {i18n.t('tlog.no_posts')}
            </h2>
          </div>
        </article>
      </section>
    );
  }
}

export default TlogPageEmpty;
