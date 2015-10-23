/*global i18n */

export function metabarAuthor({ author, tlog, host_tlog_id }) {
  if (tlog != null && author != null) {
    if (host_tlog_id == null) {
      if (author.id === tlog.id) {
        return `<a class="meta-item__link" "href="${author.url}">${author.tag}</a>`;
      } else {
        return i18n.t(
          'entry.meta.author_posted_in',
          {
            context: author.gender,
            author: author.tag,
            authorUrl: author.url,
            tlog: tlog.tag,
            tlogUrl: tlog.url,
          }
        );
      }
    } else if (host_tlog_id === tlog.id) {
      if (author.id !== tlog.id) {
        return i18n.t(
          'entry.meta.author_posted_in',
          {
            context: author.gender,
            author: author.tag,
            authorUrl: author.url,
            tlog: tlog.tag,
            tlogUrl: tlog.url,
          }
        );
      } else {
        return null;
      }
    } else if (host_tlog_id !== tlog.id) {
      if (author.id === tlog.id) {
        return i18n.t('entry.meta.repost_from', { tag: tlog.tag, url: tlog.url });
      } else {
        return i18n.t(
          'entry.meta.author_posted_in',
          {
            context: author.gender,
            author: author.tag,
            authorUrl: author.url,
            tlog: tlog.tag,
            tlogUrl: tlog.url,
          }
        );
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
}
