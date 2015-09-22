import { PropTypes } from 'react';

export const flow = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  design: PropTypes.object.isRequired,
  is_privacy: PropTypes.bool.isRequired,
  public_tlog_entries_count: PropTypes.number.isRequired,
  can_edit: PropTypes.bool,
  can_write: PropTypes.bool,
})

// TODO: specify required fields and type of position field
export const relationship = PropTypes.shape({
  id: PropTypes.number,
  position: PropTypes.any,
  reader_id: PropTypes.number,
  state: PropTypes.string,
  user_id: PropTypes.number,
})

const userpicData = PropTypes.shape({
  kind: PropTypes.string.isRequired,
  original_url: PropTypes.string,
  symbol: PropTypes.string,
});

const tlogData = PropTypes.shape({
  id: PropTypes.number.isRequired,
  tag: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  userpic: userpicData.isRequired,
});

export const tlogEntry = PropTypes.shape({
  author: tlogData.isRequired,
  can_delete: PropTypes.bool,
  can_edit: PropTypes.bool,
  can_favorite: PropTypes.bool,
  can_moderate: PropTypes.bool,
  can_report: PropTypes.bool,
  can_vote: PropTypes.bool,
  can_watch: PropTypes.bool,
  comments_count: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  is_favorited: PropTypes.bool,
  is_voteable: PropTypes.bool,
  is_watching: PropTypes.bool,
  preview_image: PropTypes.shape({
    geometry: PropTypes.shape({
      height: PropTypes.number.isRequired,
      width: PropTypes.number.isRequired,
    }),
    url: PropTypes.string.isRequired,
  }).isRequired,
  rating: PropTypes.object.isRequired,
  title_truncated: PropTypes.string.isRequired,
  tlog: tlogData.isRequired,
  type: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
})
