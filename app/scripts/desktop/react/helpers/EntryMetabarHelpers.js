/*global i18n */

export function metabarAuthor({ author, tlog, host_tlog_id }) {
  if (tlog != null && author != null) {
    if (host_tlog_id == null) {
      if (author.id === tlog.id) {
        return author.tag;
      } else {
        return i18n.t('entry.meta.author_posted_in',
                      { context: author.gender,  author: author.tag, tlog: tlog.tag });
      }
    } else if (host_tlog_id === tlog.id) {
      if (author.id !== tlog.id) {
        return i18n.t('entry.meta.author_posted_in',
                      { context: author.gender, author: author.tag, tlog: tlog.tag });
      } else {
        return null;
      }
    } else if (host_tlog_id !== tlog.id) {
      if (author.id === tlog.id) {
        return i18n.t('entry.meta.repost_from', { tag: tlog.tag });
      } else {
        return i18n.t('entry.meta.author_posted_in',
                      { context: author.gender, author: author.tag, tlog: tlog.tag });
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
}
